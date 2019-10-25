<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>Задачник BeeJee</title>
    <meta name="author" content="">
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="/app/css/bootstrap.min.css" rel="stylesheet"/>
    <link href="/app/css/style.css" rel="stylesheet"/>
    <link href="/app/font-awesome/css/font-awesome.min.css" rel="stylesheet"/>
</head>
<body style="width:100vw; min-height:100vh">
<div id="root">
</div>
<?php if(ENVIRONMENT === 'PRODUCTION'): ?>
    <script src="/react-app/build/static/js/2.a2879f99.chunk.js"></script>
    <script src="/react-app/build/static/js/main.d5730657.chunk.js"></script>
    <script src="/react-app/build/static/js/runtime-main.d247ced4.js"></script>
<?php else: ?>
    <script src="http://localhost:3000/static/js/bundle.js"></script>
    <script src="http://localhost:3000/static/js/1.chunk.js"></script>
    <script src="http://localhost:3000/static/js/main.chunk.js"></script>
<?php endif; ?>
</body>

</html>