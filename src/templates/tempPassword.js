export default function TempPassword(data) {
  this.from = 'TTN Rectro <from@gmail.com>';
  this.to = data.email;
  this.subject = 'Temp password for Rectro';
  this.html = `
    <div style="width:100%;max-width:350px; background: #DCFFC1;margin:auto; border-radius:5px;min-height:200px;padding:20px 50px">
        <h1 style="color:#424D59;font-size:18px;text-align:center">Your Temporary password is <br><b>"${data.password}"</b></h1>
        <p style="color:#424D59; font-size:14px">Please login with your email id in the Rectro app and
        generate new password with your temp password and email id.
        </p>
        <span style="color:#DCFFC1">${Date.now()}</span>
    </div>`;
}
