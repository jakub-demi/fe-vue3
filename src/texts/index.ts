const texts = {
  _documentErrors: {
    404: {
      text1: "Ooops,",
      text2: "page was not found!",
    },
  },
  login: {
    inputs: {
      email: "Email",
      password: "Password",
    },
    splitBtn: {
      forgotPassword: "Forgot Password",
      loginLabel: "Login",
    },
  },
  leftMenu: {
    dashboard: "Dashboard",
  },
  dashboardLayout: {
    menu: "Menu",
    topbar: {
      userProfileMenu: {
        sections: {
          userMenu: "User Menu",
          auth: "Authentication",
        },
        items: {
          userMenu: {
            profile: "User Profile",
          },
          auth: {
            logout: "Logout",
          },
        },
      },
    },
  },
  views: {
    profileView: {
      profile: {
        email: "Email",
        firstname: "First Name",
        lastname: "Last Name",
        chooseAvatar: "Choose Avatar",
      },
      changePassword: {
        currentPassword: "Current Password",
        newPassword: "New Password",
        newPasswordConfirmation: "New Password Again",
      },
    },
  },
  buttons: {
    save: "Save",
    update: "Update",
    create: "Create",
  },
  form: {
    fileInput: {
      chooseLabel: "Select File",
    },
  },
}
export default texts
