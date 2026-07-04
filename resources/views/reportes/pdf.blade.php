<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Reporte General</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            font-size: 12px;
            color: #333;
        }
        h1, h2 {
            color: #1E3A5F;
        }
        .header {
            text-align: center;
            border-bottom: 2px solid #1E3A5F;
            padding-bottom: 10px;
            margin-bottom: 20px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }
        th {
            background-color: #f2f2f2;
            font-weight: bold;
        }
        .text-right {
            text-align: right;
        }
        .kpi-container {
            width: 100%;
            margin-bottom: 20px;
        }
        .kpi-box {
            display: inline-block;
            width: 23%;
            padding: 10px;
            border: 1px solid #ddd;
            background-color: #fafafa;
            margin-right: 1%;
            box-sizing: border-box;
        }
    </style>
</head>
<body>

    <div class="header">
        <h1>Reporte General del Sistema</h1>
        <p>Generado el {{ date('d/m/Y H:i:s') }}</p>
    </div>

    <h2>Indicadores Clave (KPIs)</h2>
    <div class="kpi-container">
        <div class="kpi-box">
            <strong>Ventas Totales</strong><br>
            Bs. {{ number_format($kpis['total_ventas'], 2) }}
        </div>
        <div class="kpi-box">
            <strong>Compras Totales</strong><br>
            Bs. {{ number_format($kpis['total_compras'], 2) }}
        </div>
        <div class="kpi-box">
            <strong>Clientes</strong><br>
            {{ $kpis['clientes_registrados'] }}
        </div>
        <div class="kpi-box">
            <strong>Productos</strong><br>
            {{ $kpis['productos_activos'] }}
        </div>
    </div>

    <h2>Productos Más Vendidos</h2>
    <table>
        <thead>
            <tr>
                <th>Producto</th>
                <th class="text-right">Unidades Vendidas</th>
                <th class="text-right">Ingresos (Bs.)</th>
            </tr>
        </thead>
        <tbody>
            @foreach($productos_mas_vendidos as $prod)
            <tr>
                <td>{{ $prod->nombre }}</td>
                <td class="text-right">{{ (int)$prod->total_vendido }}</td>
                <td class="text-right">{{ number_format($prod->ingresos, 2) }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>

    <h2>Últimas Ventas Registradas</h2>
    <table>
        <thead>
            <tr>
                <th>Fecha</th>
                <th>Cliente</th>
                <th>Tipo</th>
                <th class="text-right">Total (Bs.)</th>
                <th>Estado</th>
            </tr>
        </thead>
        <tbody>
            @foreach($ventas_recientes as $venta)
            <tr>
                <td>{{ date('d/m/Y H:i', strtotime($venta->fecha)) }}</td>
                <td>{{ $venta->cliente ? $venta->cliente->name : 'Consumidor Final' }}</td>
                <td>{{ $venta->tipo }}</td>
                <td class="text-right">{{ number_format($venta->total, 2) }}</td>
                <td>{{ $venta->estado }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>

</body>
</html>
