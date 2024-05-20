import nodemailer from 'nodemailer';

const sendInvitation = async (req, res) => {
    const { workspaceId, role, email } = req.body;
    const invitationLink = `http://localhost:3000/workspaces/${workspaceId}/roles/${role}`;
  

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: email,
        subject: 'Workspace Invitation',
        text: `You have been invited to join the role of ${role} in the workspace. Use this link to join: ${invitationLink}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Invitation sent successfully' });
    } catch (error) {
        console.error('Error sending invitation:', error);
        res.status(500).send('Server Error');
    }
};

export default { sendInvitation };
