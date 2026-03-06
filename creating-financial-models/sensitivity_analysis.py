"""
Sensitivity analysis module for financial models.
Tests impact of variable changes on key outputs.
"""

from collections.abc import Callable
from typing import Any

import numpy as np
import pandas as pd


class SensitivityAnalyzer:
    """Perform sensitivity analysis on financial models."""

    def __init__(self, base_model: Any):
        """
        Initialize sensitivity analyzer.

        Args:
            base_model: Base financial model to analyze
        """
        self.base_model = base_model
        self.base_output = None
        self.sensitivity_results = {}

    def one_way_sensitivity(
        self,
        variable_name: str,
        base_value: float,
        range_pct: float,
        steps: int,
        output_func: Callable,
        model_update_func: Callable,
    ) -> pd.DataFrame:
        """
        Perform one-way sensitivity analysis.

        Args:
            variable_name: Name of variable to test
            base_value: Base case value
            range_pct: +/- percentage range to test
            steps: Number of steps in range
            output_func: Function to calculate output metric
            model_update_func: Function to update model with new value

        Returns:
            DataFrame with sensitivity results
        """
        # Calculate range
        min_val = base_value * (1 - range_pct)
        max_val = base_value * (1 + range_pct)
        test_values = np.linspace(min_val, max_val, steps)

        results = []
        for value in test_values:
            # Update model
            model_update_func(value)

            # Calculate output
            output = output_func()

            results.append(
                {
                    "variable": variable_name,
                    "value": value,
                    "pct_change": (value - base_value) / base_value * 100,
                    "output": output,
                    "output_change": output - self.base_output if self.base_output else 0,
                }
            )

        # Reset to base
        model_update_func(base_value)

        return pd.DataFrame(results)

    def two_way_sensitivity(
        self,
        var1_name: str,
        var1_base: float,
        var1_range: list[float],
        var2_name: str,
        var2_base: float,
        var2_range: list[float],
        output_func: Callable,
        model_update_func: Callable,
    ) -> pd.DataFrame:
        """
        Perform two-way sensitivity analysis.

        Args:
            var1_name: First variable name
            var1_base: First variable base value
            var1_range: Range of values for first variable
            var2_name: Second variable name
            var2_base: Second variable base value
            var2_range: Range of values for second variable
            output_func: Function to calculate output
            model_update_func: Function to update model (takes var1, var2)

        Returns:
            DataFrame with two-way sensitivity table
        """
        results = np.zeros((len(var1_range), len(var2_range)))

        for i, val1 in enumerate(var1_range):
            for j, val2 in enumerate(var2_range):
                # Update both variables
                model_update_func(val1, val2)

                # Calculate output
                results[i, j] = output_func()

        # Reset to base
        model_update_func(var1_base, var2_base)

        # Create DataFrame
        df = pd.DataFrame(
            results,
            index=[f"{var1_name}={v:.2%}" if v < 1 else f"{var1_name}={v:.1f}" for v in var1_range],
            columns=[
                f"{var2_name}={v:.2%}" if v < 1 else f"{var2_name}={v:.1f}" for v in var2_range
            ],
        )

        return df

    def tornado_analysis(
        self, variables: dict[str, dict[str, Any]], output_func: Callable
    ) -> pd.DataFrame:
        """
        Create tornado diagram data showing relative impact of variables.

        Args:
            variables: Dictionary of variables with base, low, high values
            output_func: Function to calculate output

        Returns:
            DataFrame sorted by impact magnitude
        """
        # Store base output
        self.base_output = output_func()

        tornado_data = []

        for var_name, var_info in variables.items():
            # Test low value
            var_info["update_func"](var_info["low"])
            low_output = output_func()

            # Test high value
            var_info["update_func"](var_info["high"])
            high_output = output_func()

            # Reset to base
            var_info["update_func"](var_info["base"])

            # Calculate impact
            impact = high_output - low_output
            low_delta = low_output - self.base_output
            high_delta = high_output - self.base_output

            tornado_data.append(
                {
                    "variable": var_name,
                    "base_value": var_info["base"],
                    "low_value": var_info["low"],
                    "high_value": var_info["high"],
                    "low_output": low_output,
                    "high_output": high_output,
                    "low_delta": low_delta,
                    "high_delta": high_delta,
                    "impact": abs(impact),
                    "impact_pct": abs(impact) / self.base_output * 100,
                }
            )

        # Sort by impact
        df = pd.DataFrame(tornado_data)
        df = df.sort_values("impact", ascending=False)

        return df

    def scenario_analysis(
        self,
        scenarios: dict[str, dict[str, float]],
        variable_updates: dict[str, Callable],
        output_func: Callable,
        probability_weights: dict[str, float] | None = None,
    ) -> pd.DataFrame:
        """
        Analyze multiple scenarios with different variable combinations.

        Args:
            scenarios: Dictionary of scenarios with variable values
            variable_updates: Functions to update each variable
            output_func: Function to calculate output
            probability_weights: Optional probability for each scenario

        Returns:
            DataFrame with scenario results
        """
        results = []

        for scenario_name, variables in scenarios.items():
            # Update all variables for this scenario
            for var_name, value in variables.items():
                if var_name in variable_updates:
                    variable_updates[var_name](value)

            # Calculate output
            output = output_func()

            # Get probability if provided
            prob = (
                probability_weights.get(scenario_name, 1 / len(scenarios))
                if probability_weights
                else 1 / len(scenarios)
            )

            results.append(
                {
                    "scenario": scenario_name,
                    "probability": prob,
                    "output": output,
                    **variables,  # Include all variable values
                }
            )

            # Reset model (simplified - should restore all base values)

        df = pd.DataFrame(results)

        # Calculate expected value
        df["weighted_output"] = df["output"] * df["probability"]
        expected_value = df["weighted_output"].sum()

        # Add summary row
        summary = pd.DataFrame(
            [
                {
                    "scenario": "Expected Value",
                    "probability": 1.0,
                    "output": expected_value,
                    "weighted_output": expected_value,
                }
            ]
        )

        df = pd.concat([df, summary], ignore_index=True)

        return df

    def breakeven_analysis(
        self,
        variable_name: str,
        variable_update: Callable,
        output_func: Callable,
        target_value: float,
        min_search: float,
        max_search: float,
        tolerance: float = 0.01,
    ) -> float:
        """
        Find breakeven point where output equals target.

        Args:
            variable_name: Variable to adjust
            variable_update: Function to update variable
            output_func: Function to calculate output
            target_value: Target output value
            min_search: Minimum search range
            max_search: Maximum search range
            tolerance: Convergence tolerance

        Returns:
            Breakeven value of variable
        """
        # Binary search for breakeven
        low = min_search
        high = max_search

        while (high - low) > tolerance:
            mid = (low + high) / 2
            variable_update(mid)
            output = output_func()

            if abs(output - target_value) < tolerance:
                return mid
            elif output < target_value:
                low = mid
            else:
                high = mid

        return (low + high) / 2


def create_data_table(
    row_variable: tuple[str, list[float], Callable],
    col_variable: tuple[str, list[float], Callable],
    output_func: Callable,
) -> pd.DataFrame:
    """
    Create Excel-style data table for two variables.

    Args:
        row_variable: (name, values, update_function)
        col_variable: (name, values, update_function)
        output_func: Function to calculate output

    Returns:
        DataFrame formatted as data table
    """
    row_name, row_values, row_update = row_variable
    col_name, col_values, col_update = col_variable

    results = np.zeros((len(row_values), len(col_values)))

    for i, row_val in enumerate(row_values):
        for j, col_val in enumerate(col_values):
            row_update(row_val)
            col_update(col_val)
            results[i, j] = output_func()

    df = pd.DataFrame(
        results,
        index=pd.Index(row_values, name=row_name),
        columns=pd.Index(col_values, name=col_name),
    )

    return df


# Example usage
if __name__ == "__main__":
    # Mock model for demonstration
    class SimpleModel:
        def __init__(self):
            self.revenue = 1000
            self.margin = 0.20
            self.multiple = 10

        def calculate_value(self):
            ebitda = self.revenue * self.margin
            return ebitda * self.multiple

    # Create model and analyzer
    model = SimpleModel()
    analyzer = SensitivityAnalyzer(model)

    # One-way sensitivity
    results = analyzer.one_way_sensitivity(
        variable_name="Revenue",
        base_value=model.revenue,
        range_pct=0.20,
        steps=5,
        output_func=model.calculate_value,
        model_update_func=lambda x: setattr(model, "revenue", x),
    )

    print("One-Way Sensitivity Analysis:")
    print(results)

    # Tornado analysis
    variables = {
        "Revenue": {
            "base": 1000,
            "low": 800,
            "high": 1200,
            "update_func": lambda x: setattr(model, "revenue", x),
        },
        "Margin": {
            "base": 0.20,
            "low": 0.15,
            "high": 0.25,
            "update_func": lambda x: setattr(model, "margin", x),
        },
        "Multiple": {
            "base": 10,
            "low": 8,
            "high": 12,
            "update_func": lambda x: setattr(model, "multiple", x),
        },
    }

    tornado = analyzer.tornado_analysis(variables, model.calculate_value)
    print("\nTornado Analysis:")
    print(tornado[["variable", "impact", "impact_pct"]])
