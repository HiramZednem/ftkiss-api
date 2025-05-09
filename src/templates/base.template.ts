export const genericMailTemplate = (
    title: string,
    message: string,
    buttonText: string,
    buttonUrl: string
  ): string => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px; padding: 32px;">
      <div style="text-align: center;">
        <img src="https://raw.githubusercontent.com/HiramZednem/ftkiss-api/2a8e0b8a53da4125db2aac1a818f43f65ccdec00/public/FTKSS.svg" alt="FTKISS Logo" height="50" style="margin-bottom: 24px;"/>
        <h2 style="color: #333;">${title}</h2>
        <p style="font-size: 16px; color: #555;">${message}</p>
        <a href="${buttonUrl}" target="_blank" style="display: inline-block; margin-top: 24px; padding: 12px 24px; background-color: #1d4ed8; color: white; text-decoration: none; border-radius: 6px;">
          ${buttonText}
        </a>
        <p style="margin-top: 40px; font-size: 12px; color: #999; border-top: 1px solid #eee; padding-top: 20px;">
          Este correo electrónico fue enviado desde una dirección solamente de notificaciones. Por favor no respondas a este mensaje.<br />
          <em>Adjust your email settings</em>
        </p>
      </div>
    </div>
  `;
  