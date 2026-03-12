"""
Discounted Cash Flow (DCF) valuation model.
Implements enterprise valuation using free cash flow projections.
"""

from typing import Any

import numpy as np


class DCFModel:
    """Build and calculate DCF valuation models."""

    def __init__(self, company_name: str = "Company"):
        """
        Initialize DCF model.

        Args:
            company_name: Name of the company being valued
        """
        self.company_name = company_name
        self.historical_financials = {}
        self.projections = {}
        self.assumptions = {}
        self.wacc_components = {}
        self.valuation_results = {}

    def set_historical_financials(
        self,
        revenue: list[float],
        ebitda: list[float],
        capex: list[float],
        nwc: list[float],
        years: list[int],
    ):
        """
        Set historical financial data.

        Args:
            revenue: Historical revenue
            ebitda: Historical EBITDA
            capex: Historical capital expenditure
            nwc: Historical net working capital
            years: Historical years
        """
        self.historical_financials = {
            "years": years,
            "revenue": revenue,
            "ebitda": ebitda,
            "capex": capex,
            "nwc": nwc,
            "ebitda_margin": [ebitda[i] / revenue[i] for i in range(len(revenue))],
            "capex_percent": [capex[i] / revenue[i] for i in range(len(revenue))],
        }

    def set_assumptions(
        self,
        projection_years: int = 5,
        revenue_growth: list[float] = None,
        ebitda_margin: list[float] = None,
        tax_rate: float = 0.25,
        capex_percent: list[float] = None,
        nwc_percent: list[float] = None,
        terminal_growth: float = 0.03,
    ):
        """
        Set projection assumptions.

        Args:
            projection_years: Number of years to project
            revenue_growth: Annual revenue growth rates
            ebitda_margin: EBITDA margins by year
            tax_rate: Corporate tax rate
            capex_percent: Capex as % of revenue
            nwc_percent: NWC as % of revenue
            terminal_growth: Terminal growth rate
        """
        if revenue_growth is None:
            revenue_growth = [0.10] * projection_years  # Default 10% growth

        if ebitda_margin is None:
            # Use historical average if available
            if self.historical_financials:
                avg_margin = np.mean(self.historical_financials["ebitda_margin"])
                ebitda_margin = [avg_margin] * projection_years
            else:
                ebitda_margin = [0.20] * projection_years  # Default 20% margin

        if capex_percent is None:
            capex_percent = [0.05] * projection_years  # Default 5% of revenue

        if nwc_percent is None:
            nwc_percent = [0.10] * projection_years  # Default 10% of revenue

        self.assumptions = {
            "projection_years": projection_years,
            "revenue_growth": revenue_growth,
            "ebitda_margin": ebitda_margin,
            "tax_rate": tax_rate,
            "capex_percent": capex_percent,
            "nwc_percent": nwc_percent,
            "terminal_growth": terminal_growth,
        }

    def calculate_wacc(
        self,
        risk_free_rate: float,
        beta: float,
        market_premium: float,
        cost_of_debt: float,
        debt_to_equity: float,
        tax_rate: float | None = None,
    ) -> float:
        """
        Calculate Weighted Average Cost of Capital (WACC).

        Args:
            risk_free_rate: Risk-free rate (e.g., 10-year treasury)
            beta: Equity beta
            market_premium: Equity market risk premium
            cost_of_debt: Pre-tax cost of debt
            debt_to_equity: Debt-to-equity ratio
            tax_rate: Tax rate (uses assumption if not provided)

        Returns:
            WACC as decimal
        """
        if tax_rate is None:
            tax_rate = self.assumptions.get("tax_rate", 0.25)

        # Calculate cost of equity using CAPM
        cost_of_equity = risk_free_rate + beta * market_premium

        # Calculate weights
        equity_weight = 1 / (1 + debt_to_equity)
        debt_weight = debt_to_equity / (1 + debt_to_equity)

        # Calculate WACC
        wacc = equity_weight * cost_of_equity + debt_weight * cost_of_debt * (1 - tax_rate)

        self.wacc_components = {
            "risk_free_rate": risk_free_rate,
            "beta": beta,
            "market_premium": market_premium,
            "cost_of_equity": cost_of_equity,
            "cost_of_debt": cost_of_debt,
            "debt_to_equity": debt_to_equity,
            "equity_weight": equity_weight,
            "debt_weight": debt_weight,
            "tax_rate": tax_rate,
            "wacc": wacc,
        }

        return wacc

    def project_cash_flows(self) -> dict[str, list[float]]:
        """
        Project future cash flows based on assumptions.

        Returns:
            Dictionary with projected financials
        """
        years = self.assumptions["projection_years"]

        # Start with last historical revenue if available
        if self.historical_financials and "revenue" in self.historical_financials:
            base_revenue = self.historical_financials["revenue"][-1]
        else:
            base_revenue = 1000  # Default base

        projections = {
            "year": list(range(1, years + 1)),
            "revenue": [],
            "ebitda": [],
            "ebit": [],
            "tax": [],
            "nopat": [],
            "capex": [],
            "nwc_change": [],
            "fcf": [],
        }

        prev_revenue = base_revenue
        prev_nwc = base_revenue * 0.10  # Initial NWC assumption

        for i in range(years):
            # Revenue
            revenue = prev_revenue * (1 + self.assumptions["revenue_growth"][i])
            projections["revenue"].append(revenue)

            # EBITDA
            ebitda = revenue * self.assumptions["ebitda_margin"][i]
            projections["ebitda"].append(ebitda)

            # EBIT (assuming depreciation = capex for simplicity)
            depreciation = revenue * self.assumptions["capex_percent"][i]
            ebit = ebitda - depreciation
            projections["ebit"].append(ebit)

            # Tax
            tax = ebit * self.assumptions["tax_rate"]
            projections["tax"].append(tax)

            # NOPAT
            nopat = ebit - tax
            projections["nopat"].append(nopat)

            # Capex
            capex = revenue * self.assumptions["capex_percent"][i]
            projections["capex"].append(capex)

            # NWC change
            nwc = revenue * self.assumptions["nwc_percent"][i]
            nwc_change = nwc - prev_nwc
            projections["nwc_change"].append(nwc_change)

            # Free Cash Flow
            fcf = nopat + depreciation - capex - nwc_change
            projections["fcf"].append(fcf)

            prev_revenue = revenue
            prev_nwc = nwc

        self.projections = projections
        return projections

    def calculate_terminal_value(
        self, method: str = "growth", exit_multiple: float | None = None
    ) -> float:
        """
        Calculate terminal value using perpetuity growth or exit multiple.

        Args:
            method: 'growth' for perpetuity growth, 'multiple' for exit multiple
            exit_multiple: EV/EBITDA exit multiple (if using multiple method)

        Returns:
            Terminal value
        """
        if not self.projections:
            raise ValueError("Must project cash flows first")

        if method == "growth":
            # Gordon growth model
            final_fcf = self.projections["fcf"][-1]
            terminal_growth = self.assumptions["terminal_growth"]
            wacc = self.wacc_components["wacc"]

            # FCF in terminal year
            terminal_fcf = final_fcf * (1 + terminal_growth)

            # Terminal value
            terminal_value = terminal_fcf / (wacc - terminal_growth)

        elif method == "multiple":
            if exit_multiple is None:
                exit_multiple = 10  # Default EV/EBITDA multiple

            final_ebitda = self.projections["ebitda"][-1]
            terminal_value = final_ebitda * exit_multiple

        else:
            raise ValueError("Method must be 'growth' or 'multiple'")

        return terminal_value

    def calculate_enterprise_value(
        self, terminal_method: str = "growth", exit_multiple: float | None = None
    ) -> dict[str, Any]:
        """
        Calculate enterprise value by discounting cash flows.

        Args:
            terminal_method: Method for terminal value calculation
            exit_multiple: Exit multiple if using multiple method

        Returns:
            Valuation results dictionary
        """
        if not self.projections:
            self.project_cash_flows()

        if "wacc" not in self.wacc_components:
            raise ValueError("Must calculate WACC first")

        wacc = self.wacc_components["wacc"]
        years = self.assumptions["projection_years"]

        # Calculate PV of projected cash flows
        pv_fcf = []
        for i, fcf in enumerate(self.projections["fcf"]):
            discount_factor = (1 + wacc) ** (i + 1)
            pv = fcf / discount_factor
            pv_fcf.append(pv)

        total_pv_fcf = sum(pv_fcf)

        # Calculate terminal value
        terminal_value = self.calculate_terminal_value(terminal_method, exit_multiple)

        # Discount terminal value
        terminal_discount = (1 + wacc) ** years
        pv_terminal = terminal_value / terminal_discount

        # Enterprise value
        enterprise_value = total_pv_fcf + pv_terminal

        self.valuation_results = {
            "enterprise_value": enterprise_value,
            "pv_fcf": total_pv_fcf,
            "pv_terminal": pv_terminal,
            "terminal_value": terminal_value,
            "terminal_method": terminal_method,
            "pv_fcf_detail": pv_fcf,
            "terminal_percent": pv_terminal / enterprise_value * 100,
        }

        return self.valuation_results

    def calculate_equity_value(
        self, net_debt: float, cash: float = 0, shares_outstanding: float = 100
    ) -> dict[str, Any]:
        """
        Calculate equity value from enterprise value.

        Args:
            net_debt: Total debt minus cash
            cash: Cash and equivalents (if not netted)
            shares_outstanding: Number of shares (millions)

        Returns:
            Equity valuation metrics
        """
        if "enterprise_value" not in self.valuation_results:
            raise ValueError("Must calculate enterprise value first")

        ev = self.valuation_results["enterprise_value"]

        # Equity value = EV - Net Debt
        equity_value = ev - net_debt + cash

        # Per share value
        value_per_share = equity_value / shares_outstanding if shares_outstanding > 0 else 0

        equity_results = {
            "equity_value": equity_value,
            "shares_outstanding": shares_outstanding,
            "value_per_share": value_per_share,
            "net_debt": net_debt,
            "cash": cash,
        }

        self.valuation_results.update(equity_results)
        return equity_results

    def sensitivity_analysis(
        self, variable1: str, range1: list[float], variable2: str, range2: list[float]
    ) -> np.ndarray:
        """
        Perform two-way sensitivity analysis on valuation.

        Args:
            variable1: First variable to test ('wacc', 'growth', 'margin')
            range1: Range of values for variable1
            variable2: Second variable to test
            range2: Range of values for variable2

        Returns:
            2D array of valuations
        """
        results = np.zeros((len(range1), len(range2)))

        # Store original values
        orig_wacc = self.wacc_components.get("wacc", 0.10)
        orig_growth = self.assumptions.get("terminal_growth", 0.03)
        orig_margin = self.assumptions.get("ebitda_margin", [0.20] * 5)

        for i, val1 in enumerate(range1):
            for j, val2 in enumerate(range2):
                # Update first variable
                if variable1 == "wacc":
                    self.wacc_components["wacc"] = val1
                elif variable1 == "growth":
                    self.assumptions["terminal_growth"] = val1
                elif variable1 == "margin":
                    self.assumptions["ebitda_margin"] = [val1] * len(orig_margin)

                # Update second variable
                if variable2 == "wacc":
                    self.wacc_components["wacc"] = val2
                elif variable2 == "growth":
                    self.assumptions["terminal_growth"] = val2
                elif variable2 == "margin":
                    self.assumptions["ebitda_margin"] = [val2] * len(orig_margin)

                # Recalculate
                self.project_cash_flows()
                valuation = self.calculate_enterprise_value()
                results[i, j] = valuation["enterprise_value"]

        # Restore original values
        self.wacc_components["wacc"] = orig_wacc
        self.assumptions["terminal_growth"] = orig_growth
        self.assumptions["ebitda_margin"] = orig_margin

        return results

    def generate_summary(self) -> str:
        """
        Generate text summary of valuation results.

        Returns:
            Formatted summary string
        """
        if not self.valuation_results:
            return "No valuation results available. Run valuation first."

        summary = [
            f"DCF Valuation Summary - {self.company_name}",
            "=" * 50,
            "",
            "Key Assumptions:",
            f"  Projection Period: {self.assumptions['projection_years']} years",
            f"  Revenue Growth: {np.mean(self.assumptions['revenue_growth']) * 100:.1f}% avg",
            f"  EBITDA Margin: {np.mean(self.assumptions['ebitda_margin']) * 100:.1f}% avg",
            f"  Terminal Growth: {self.assumptions['terminal_growth'] * 100:.1f}%",
            f"  WACC: {self.wacc_components['wacc'] * 100:.1f}%",
            "",
            "Valuation Results:",
            f"  Enterprise Value: ${self.valuation_results['enterprise_value']:,.0f}M",
            f"    PV of FCF: ${self.valuation_results['pv_fcf']:,.0f}M",
            f"    PV of Terminal: ${self.valuation_results['pv_terminal']:,.0f}M",
            f"    Terminal % of Value: {self.valuation_results['terminal_percent']:.1f}%",
            "",
        ]

        if "equity_value" in self.valuation_results:
            summary.extend(
                [
                    "Equity Valuation:",
                    f"  Equity Value: ${self.valuation_results['equity_value']:,.0f}M",
                    f"  Shares Outstanding: {self.valuation_results['shares_outstanding']:.0f}M",
                    f"  Value per Share: ${self.valuation_results['value_per_share']:.2f}",
                    "",
                ]
            )

        return "\n".join(summary)


# Helper functions for common calculations


def calculate_beta(stock_returns: list[float], market_returns: list[float]) -> float:
    """
    Calculate beta from return series.

    Args:
        stock_returns: Historical stock returns
        market_returns: Historical market returns

    Returns:
        Beta coefficient
    """
    covariance = np.cov(stock_returns, market_returns)[0, 1]
    market_variance = np.var(market_returns)
    beta = covariance / market_variance if market_variance != 0 else 1.0
    return beta


def calculate_fcf_cagr(fcf_series: list[float]) -> float:
    """
    Calculate compound annual growth rate of FCF.

    Args:
        fcf_series: Free cash flow time series

    Returns:
        CAGR as decimal
    """
    if len(fcf_series) < 2:
        return 0

    years = len(fcf_series) - 1
    if fcf_series[0] <= 0 or fcf_series[-1] <= 0:
        return 0

    cagr = (fcf_series[-1] / fcf_series[0]) ** (1 / years) - 1
    return cagr


# Example usage
if __name__ == "__main__":
    # Create model
    model = DCFModel("TechCorp")

    # Set historical data
    model.set_historical_financials(
        revenue=[800, 900, 1000],
        ebitda=[160, 189, 220],
        capex=[40, 45, 50],
        nwc=[80, 90, 100],
        years=[2022, 2023, 2024],
    )

    # Set assumptions
    model.set_assumptions(
        projection_years=5,
        revenue_growth=[0.15, 0.12, 0.10, 0.08, 0.06],
        ebitda_margin=[0.23, 0.24, 0.25, 0.25, 0.25],
        tax_rate=0.25,
        terminal_growth=0.03,
    )

    # Calculate WACC
    model.calculate_wacc(
        risk_free_rate=0.04, beta=1.2, market_premium=0.07, cost_of_debt=0.05, debt_to_equity=0.5
    )

    # Project cash flows
    model.project_cash_flows()

    # Calculate valuation
    model.calculate_enterprise_value()

    # Calculate equity value
    model.calculate_equity_value(net_debt=200, shares_outstanding=50)

    # Print summary
    print(model.generate_summary())
