const style = `<style>
  img {
    border: none;
    -ms-interpolation-mode: bicubic;
    max-width: 100%; 
  }
  body {
    background-color: #f6f6f6;
    font-family: sans-serif;
    -webkit-font-smoothing: antialiased;
    font-size: 14px;
    line-height: 1.4;
    margin: 0;
    padding: 0;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%; 
  }
  table {
    border-collapse: separate;
    mso-table-lspace: 0pt;
    mso-table-rspace: 0pt;
    width: 100%; }
    table td {
      font-family: sans-serif;
      font-size: 14px;
      vertical-align: top; 
  }
  .body {
    background-color: #f6f6f6;
    width: 100%; 
  }
  .container {
    display: block;
    margin: 0 auto !important;
    /* makes it centered */
    max-width: 580px;
    padding: 10px;
    width: 580px; 
  }
  .content {
    box-sizing: border-box;
    display: block;
    margin: 0 auto;
    max-width: 580px;
    padding: 10px; 
  }
  .main {
    background: #ffffff;
    border-radius: 3px;
    width: 100%; 
  }
  .wrapper {
    box-sizing: border-box;
    padding: 20px; 
  }
  .content-block {
    padding-bottom: 10px;
    padding-top: 10px;
  }
  .footer {
    clear: both;
    margin-top: 10px;
    text-align: center;
    width: 100%; 
  }
    .footer td,
    .footer p,
    .footer span,
    .footer a {
      color: #999999;
      font-size: 12px;
      text-align: center; 
  }
  h1,
  h2,
  h3,
  h4 {
    color: #000000;
    font-family: sans-serif;
    font-weight: 400;
    line-height: 1.4;
    margin: 0;
    margin-bottom: 30px; 
  }
  h1 {
    font-size: 35px;
    font-weight: 300;
    text-align: center;
    text-transform: capitalize; 
  }
  p,
  ul,
  ol {
    font-family: sans-serif;
    font-size: 14px;
    font-weight: normal;
    margin: 0;
    margin-bottom: 15px; 
  }
    p li,
    ul li,
    ol li {
      list-style-position: inside;
      margin-left: 5px; 
  }
  a {
    color: #55c57a;
    text-decoration: underline; 
  }
  .btn {
    box-sizing: border-box;
    width: 100%; }
    .btn > tbody > tr > td {
      padding-bottom: 15px; }
    .btn table {
      width: auto; 
  }
    .btn table td {
      background-color: #ffffff;
      border-radius: 5px;
      text-align: center; 
  }
    .btn a {
      background-color: #ffffff;
      border: solid 1px #55c57a;
      border-radius: 5px;
      box-sizing: border-box;
      color: #55c57a;
      cursor: pointer;
      display: inline-block;
      font-size: 14px;
      font-weight: bold;
      margin: 0;
      padding: 12px 25px;
      text-decoration: none;
      text-transform: capitalize; 
  }
  .btn-primary table td {
    background-color: #55c57a; 
  }
  .btn-primary a {
    background-color: #733660;
    border-color: #733660;
    color: #ffffff; 
  }
  .last {
    margin-bottom: 0; 
  }
  .first {
    margin-top: 0; 
  }
  .align-center {
    text-align: center; 
  }
  .align-right {
    text-align: right; 
  }
  .align-left {
    text-align: left; 
  }
  .clear {
    clear: both; 
  }
  .mt0 {
    margin-top: 0; 
  }
  .mb0 {
    margin-bottom: 0; 
  }
  .preheader {
    color: transparent;
    display: none;
    height: 0;
    max-height: 0;
    max-width: 0;
    opacity: 0;
    overflow: hidden;
    mso-hide: all;
    visibility: hidden;
    width: 0; 
  }
  .powered-by a {
    text-decoration: none; 
  }
  hr {
    border: 0;
    border-bottom: 1px solid #f6f6f6;
    margin: 20px 0; 
  }
  @media only screen and (max-width: 620px) {
    table[class=body] h1 {
      font-size: 28px !important;
      margin-bottom: 10px !important; 
    }
    table[class=body] p,
    table[class=body] ul,
    table[class=body] ol,
    table[class=body] td,
    table[class=body] span,
    table[class=body] a {
      font-size: 16px !important; 
    }
    table[class=body] .wrapper,
    table[class=body] .article {
      padding: 10px !important; 
    }
    table[class=body] .content {
      padding: 0 !important; 
    }
    table[class=body] .container {
      padding: 0 !important;
      width: 100% !important; 
    }
    table[class=body] .main {
      border-left-width: 0 !important;
      border-radius: 0 !important;
      border-right-width: 0 !important; 
    }
    table[class=body] .btn table {
      width: 100% !important; 
    }
    table[class=body] .btn a {
      width: 100% !important; 
    }
    table[class=body] .img-responsive {
      height: auto !important;
      max-width: 100% !important;
      width: auto !important; 
    }
  }
  @media all {
    .ExternalClass {
      width: 100%; 
    }
    .ExternalClass,
    .ExternalClass p,
    .ExternalClass span,
    .ExternalClass font,
    .ExternalClass td,
    .ExternalClass div {
      line-height: 100%; 
    }
    .apple-link a {
      color: inherit !important;
      font-family: inherit !important;
      font-size: inherit !important;
      font-weight: inherit !important;
      line-height: inherit !important;
      text-decoration: none !important; 
    }
    .btn-primary table td:hover {
      background-color: #2e864b !important; 
    }
    .btn-primary a:hover {
      background-color: #5c2b4d !important;
      border-color: #5c2b4d !important; 
    } 
  }
</style>`;

const generatebaseEmail = (content) => {
  return `<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title></title>
    ${style}
  </head>
  <body>
    <table class="body" role="presentation" border="0" cellpadding="0" cellspacing="0">
      <tbody>
        <tr>
          <td></td>
          <td class="container">
            <div class="content">
              <!-- START CENTERED WHITE CONTAINER-->
              <table class="main" role="presentation">
                <!-- START MAIN AREA-->
                <tbody>
                  <tr>
                    <td class="wrapper">
                      <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                        <tbody>
                          <tr>
                            <td>
                             ${content}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <!-- START FOOTER-->
              <div class="footer">
                <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                  <tbody>
                    <tr>
                      <td class="content-block"><span class="apple-link">Natours Inc, 123 Nowhere Road, San Francisco CA 99999</span><br> Don't like these emails? <a href="#">Unsubscribe</a></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </body>
</html>`;
};

exports.welcomeEmailTemplate = (content) => {
  return generatebaseEmail(` <p>Hi ${content.firstName},</p>
<p>Welcome to EgyPicks, we're glad to have you 🎉🙏</p>
<table class="btn btn-primary" role="presentation" border="0" cellpadding="0" cellspacing="0">
  <tbody>
    <tr>
      <td align="left">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0">
          <tbody>
            <tr>
              <td><a href="${content.url}" target="_blank">Upload user photo</a></td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>
<p>If you need any help with Shopping your next order, please don't hesitate to contact me!</p>
<p>- Mariam Mohsen, CEO</p>`);
};

exports.resetEmailTemplate = (content) => {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Static Template</title>

    <link
      href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap"
      rel="stylesheet"
    />
  </head>
  <body
    style="
      margin: 0;
      font-family: 'Poppins', sans-serif;
      background: #ffffff;
      font-size: 14px;
    "
  >
    <div
      style="
        max-width: 680px;
        margin: 0 auto;
        padding: 45px 30px 60px;
        background: #f4f7ff;
        background-image: url(https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661497957196_595865/email-template-background-banner);
        background-repeat: no-repeat;
        background-size: 800px 452px;
        background-position: top center;
        font-size: 14px;
        color: #434343;
      "
    >
      <header>
        <table style="width: 100%">
          <tbody>
            <tr style="height: 0">
              <td>
              </td>
            </tr>
          </tbody>
        </table>
      </header>

      <main>
        <div
          style="
            margin: 0;
            margin-top: 70px;
            padding: 92px 30px 115px;
            background: #ffffff;
            border-radius: 30px;
            text-align: center;
          "
        >
          <div style="width: 100%; max-width: 489px; margin: 0 auto">
            <h1
              style="
                margin: 0;
                font-size: 24px;
                font-weight: 500;
                color: #1f1f1f;
              "
            >
              Your OTP
            </h1>
            <p
              style="
                margin: 0;
                margin-top: 17px;
                font-size: 16px;
                font-weight: 500;
              "
            >
              Hey ${content.firstName},
            </p>
            <p
              style="
                margin: 0;
                margin-top: 17px;
                font-weight: 500;
                letter-spacing: 0.56px;
              "
            >
              Thank you for choosing EgyPicks . Use the following OTP
              to complete the procedure to reset your password. OTP is
              valid for
              <span style="font-weight: 600; color: #1f1f1f">10 minutes</span>.
              Do not share this code with others
            </p>
            <p
              style="
                margin: 0;
                margin-top: 60px;
                font-size: 40px;
                font-weight: 600;
                letter-spacing: 25px;
                color: #ba3d4f;
              "
            >
              ${content.code}
            </p>
          </div>
        </div>

        <p
          style="
            max-width: 400px;
            margin: 0 auto;
            margin-top: 90px;
            text-align: center;
            font-weight: 500;
            color: #8c8c8c;
          "
        >
          Need help? Ask at
          <a
            href="mailto:egypicks11@gmail.com"
            style="color: #499fb6; text-decoration: none"
            >egypicks11@gmail.com</a>
          
        </p>
      </main>

      <footer
        style="
          width: 100%;
          max-width: 490px;
          margin: 20px auto 0;
          text-align: center;
          border-top: 1px solid #e6ebf1;
        "
      >
        <p
          style="
            margin: 0;
            margin-top: 40px;
            font-size: 16px;
            font-weight: 600;
            color: #434343;
          "
        >
          EgyPicks
        </p>
        <div style="margin: 0; margin-top: 16px">
          <a href="" target="_blank" style="display: inline-block">
            <img
              width="36px"
              alt="Facebook"
              src="https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661502815169_682499/email-template-icon-facebook"
            />
          </a>
          <a
            href=""
            target="_blank"
            style="display: inline-block; margin-left: 8px"
          >
            <img
              width="36px"
              alt="Instagram"
              src="https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661504218208_684135/email-template-icon-instagram"
          /></a>
          <a
            href=""
            target="_blank"
            style="display: inline-block; margin-left: 8px"
          >
            <img
              width="36px"
              alt="Twitter"
              src="https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661503043040_372004/email-template-icon-twitter"
            />
          </a>
          <a
            href=""
            target="_blank"
            style="display: inline-block; margin-left: 8px"
          >
            <img
              width="36px"
              alt="Youtube"
              src="https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661503195931_210869/email-template-icon-youtube"
          /></a>
        </div>
      </footer>
    </div>
  </body>
</html>
`;
};
