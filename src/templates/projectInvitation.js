export default function ProjectInvitation(data) {
  const sendTo = data.members.map(member => member.email);
  const obj = {};
  obj.from = 'TTN Rectro <from@gmail.com>';
  obj.to = [...sendTo];
  obj.subject = 'Project Invitation';
  obj.html = `
      <div style="width:100%;max-width:350px; background: #DCFFC1;margin:auto; border-radius:5px;min-height:200px;padding:20px 50px">
          <h1 style="color:#424D59;font-size:18px;text-align:center">Invitation for the<br><b>"${data.name}"</b></h1>
          <p style="color:#424D59; font-size:14px">You are invited for the project ${data.name} from <a>${data.userEmail}</a>.
           If you are an existing user then login with your details and if not then "Temporary" password is sent to you
            in another mail use those credtials for the Login.</a> .
          </p>
          <span style="color:#DCFFC1">${Date.now()}</span>
      </div>`;
  return obj;
}
