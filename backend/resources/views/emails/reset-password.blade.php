<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Password</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            text-align: center;
            border-radius: 10px 10px 0 0;
        }
        .content {
            background: #f9f9f9;
            padding: 30px;
            border: 1px solid #ddd;
        }
        .button {
            display: inline-block;
            padding: 15px 30px;
            background: #667eea;
            color: white !important;
            text-decoration: none;
            border-radius: 5px;
            margin: 20px 0;
            font-weight: bold;
        }
        .token-box {
            background: white;
            border: 2px dashed #667eea;
            padding: 15px;
            margin: 20px 0;
            border-radius: 5px;
            word-break: break-all;
            font-family: monospace;
        }
        .footer {
            text-align: center;
            color: #777;
            font-size: 12px;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
        }
        .warning {
            background: #fff3cd;
            border: 1px solid #ffc107;
            padding: 15px;
            border-radius: 5px;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>🔐 Reset Password</h1>
        <p>SMAN Saba Dashboard</p>
    </div>
    
    <div class="content">
        <p>Halo <strong>{{ $user->name }}</strong>,</p>
        
        <p>Kami menerima permintaan untuk mereset password akun admin Anda. Klik tombol di bawah ini untuk mereset password:</p>
        
        <center>
            <a href="{{ env('FRONTEND_URL', 'http://localhost:5173') }}/reset-password?email={{ $user->email }}&token={{ $token }}" class="button">Reset Password Sekarang</a>
        </center>
        
        <p>Atau salin dan tempel link berikut ke browser Anda:</p>
        <div class="token-box">
            {{ env('FRONTEND_URL', 'http://localhost:5173') }}/reset-password?email={{ $user->email }}&token={{ $token }}
        </div>
        
        <div class="warning">
            <strong>⚠️ Penting:</strong>
            <ul style="margin: 10px 0;">
                <li>Link ini hanya berlaku selama 1 jam</li>
                <li>Link ini hanya berlaku untuk satu kali penggunaan</li>
                <li>Jangan berikan link ini kepada siapa pun</li>
                <li>Jika Anda tidak meminta reset password, abaikan email ini</li>
            </ul>
        </div>
    </div>
    
    <div class="footer">
        <p>Email ini dikirim secara otomatis oleh sistem SMAN Saba</p>
        <p>&copy; {{ date('Y') }} SMAN 1 BANGSRI. All rights reserved.</p>
    </div>
</body>
</html>
