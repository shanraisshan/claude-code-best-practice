# Weather Agent Memory（天气代理记忆）

## API 配置
- 提供商：Open-Meteo（免费，无需 API 密钥）
- 迪拜坐标：纬度 25.2048，经度 55.2708
- 摄氏度 URL：`https://api.open-meteo.com/v1/forecast?latitude=25.2048&longitude=55.2708&current=temperature_2m&temperature_unit=celsius`
- 华氏度 URL：`https://api.open-meteo.com/v1/forecast?latitude=25.2048&longitude=55.2708&current=temperature_2m&temperature_unit=fahrenheit`
- 温度字段：`current.temperature_2m`

## 最近读取

| 日期 | 温度 | 单位 |
|------|-------------|------|
| 2026-03-06 | 22.3 | 摄氏度 |
| 2026-03-06 | 22.5 | 摄氏度 |
| 2026-03-07 | 25.7 | 摄氏度 |