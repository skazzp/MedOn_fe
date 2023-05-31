interface IHelpContent {
  id: number;
  title: string;
  description: string;
}

type Language = 'en' | 'fr';

const helpData = {
  en: [
    {
      id: 1,
      title: 'How to register on the site and create an account?',
      description:
        '<p>You can register on our website in two ways:</p><h3>First Method:</h3><ol><li>Click on the hyperlink <strong>"Don\'t have an account? Click here"</strong></li><li>Fill in all the mandatory fields and click on the <strong>“Sign up” button</strong></li><li>A confirmation email will be sent to your email inbox. Click on the link sent to you by email.</li></ol><h3>Second Method:</h3><ol><li>Click on the <strong>"Continue with Google" button.</strong></li><li>Select your email address and the system will automatically register you.</li></ol><p>Welcome to the site.</p>',
    },
    {
      id: 2,
      title: 'How to recover a password if you forgot it?',
      description:
        '<p><ol><li>Click on the button <strong>"Forgot your password?"</strong></li><li>Enter your email address in the <strong>"Email" field.</strong></li><li>Click Next.</li><p>An email will be sent to the address you provided.</p><li>Go to your email and click on the button <strong>"Reset your password".</strong></li><li>In the window that opens, enter a new password and confirm it.</li></ol></p>',
    },
    {
      id: 3,
      title: 'How to change personal details in profile?',
      description:
        '<p>To change your personal details in your profile:</p><ol><li>Click on the <strong>"Edit profile"</strong> button at the bottom of the user\'s profile.</li><li>Change your details.</li><p>Note that it is not possible to change your <strong>"Role"</strong> (Remote Doctor/Local Doctor).</p><li>Click the <strong>Update Profile button.</strong></li></ol>',
    },
    {
      id: 4,
      title:
        'How can a local doctor create an appointment with a remote doctor?',
      description:
        '<p>In order for a local doctor to create an appointment with a remote doctor:</p><ol><li>Go to <strong>"Patient List"</strong> and select the desired patient to create an appointment with a remote doctor.</li><li>Click on the button <strong>"Book an appointment"</strong></li><li>Select the desired meeting day and click on the <strong>"Next step" button</strong></li><li>Select the time available in the list and the appropriate doctor and click on the <strong>"Next step" button</strong></li><li>Click on the button <strong>"Book an appointment"</strong></li></ol>',
    },
    {
      id: 5,
      title: 'How to create a patient card?',
      description:
        '<p>To create a patient card</p><ol><li>Go to the <strong>"Patient List"</strong> section in the left menu.</li><li>Click the <strong>"Create Patient"</strong> button in the upper right corner.</li><li>Fill in all the required information and click on the <strong>"Save Patient" button</strong></li></ol>',
    },
    {
      id: 6,
      title: 'How to find a patient in the patient list?',
      description:
        '<p>In order to find the patient you need, go to the <strong>"Patient List"</strong> section in the left menu and use the search bar or scroll down this page.</p>',
    },
    {
      id: 7,
      title: 'How can a remote doctor create his availability time?',
      description:
        '<p>In order for a remote doctor to create a schedule of its availability:</p><ol><li>Go to <strong>"Availability"</strong> in the left menu</li><li>Select the day you want on the calendar and click in the cell.</li><li>Select the desired time interval and <strong>click save</strong></li></ol>',
    },
    {
      id: 8,
      title: 'What a dashboard is?',
      description:
        '<p>The Dashboard contains all the information about upcoming appointments. In case if there are no upcoming appointments, a button will be displayed:</p><p>For a Remote Doctor, <strong>"Manage Availability"</strong> will redirect you to a calendar to select a date and time.</p><p>For a local doctor - <strong>"Book an appointment"</strong>, which will redirect you to the list of patients for further booking an appointment with a remote doctor.</p>',
    },
    {
      id: 9,
      title: 'How to contact site support for help or ask a question?',
      description:
        '<p>There is a cute project manager <strong>Olha Bilous</strong>, contact her and she will explain everything to you! :))</p>',
    },
    {
      id: 10,
      title:
        'How to find out information about the privacy policy and the protection of personal data?',
      description:
        '<p>In order to find out information about the privacy policy and protection of personal data, go to the privacy policy section.</p>',
    },
  ],
  fr: [],
};

export function getHelpContent(language: string): IHelpContent[] {
  return helpData[language as Language] || helpData.en;
}
