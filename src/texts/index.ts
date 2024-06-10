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
    orders: {
      index: "Orders",
      all: "All Orders",
      create: "Create Order",
    },
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
    back: "Back",
  },
  form: {
    fileInput: {
      chooseLabel: "Select File",
    },
    dateTimePicker: {
      placeholder: "Choose Date & Time",
    },
  },
  table: {
    headers: {
      actions: "Actions",
    },
  },
  toast: {
    errors: {
      accessDenied: "Access Forbidden!",
      wrongRequest: "Wrong Request!",
    },
  },
  formWrap: {
    loading: "Loading",
  },
  orders: {
    table: {
      headers: {
        orderNumber: "Order Number",
        dueDate: "Payment Due Date",
        paymentDate: "Payment Date",
        createdAt: "Created At",
        currentStatus: "Status",
        hasAccess: "Edit Access?",
        orderUsers: "Order Users",
      },
      columns: {
        currentStatus: {
          noStatus: "No Status",
        },
      },
    },
    form: {
      labels: {
        dueDate: "Payment Due Date",
        paymentDate: "Payment Date",
        createdAt: "Created At",
        customerName: "Customer Name",
        customerAddress: "Customer Address",
        orderUsers: "Order Users",
        category: "Category",
        status: "Order Status",
      },
      placeholders: {
        selectCategory: "Select a Category",
        selectStatus: "Select a Status",
      },
    },
  },
  dialog: {
    buttons: {
      confirm: "Confirm",
      decline: "Decline",
      ok: "OK",
    },
    headers: {
      confirm: "Confirmation",
      info: "Info",
    },
  },
}
export default texts
