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
    forgotPassword: {
      emailSent: "Confirmation email for password reset was sent to your email.",
      header: "Forgot Password",
      description:
        "If you forgot your password, we can send you password reset link to your email.",
      email: "Email",
      buttons: {
        send: "Send",
        cancel: "Cancel",
      },
    },
    resetPassword: {
      passwordChangeSuccess: "Your password change was successful, you can login now.",
      noQueryParamsErrorToast: {
        title: "Password Reset",
      },
      header: "Change Password",
      description: "Now you can change your password.",
      labels: {
        password: "Password",
        passwordConfirmation: "Password Again",
      },
      buttons: {
        change: "Change",
        cancel: "Cancel",
      },
    },
  },
  leftMenu: {
    dashboard: "Dashboard",
    orders: {
      index: "Orders",
      all: "All Orders",
      create: "Create Order",
    },
    orderCategories: {
      index: "Order Categories",
      all: "All Order Categoties",
      create: "Create Order Category",
    },
    users: {
      index: "Users",
      all: "All Users",
      create: "Create User",
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
      editOptions: "Edit Options",
    },
    dialog: {
      texts: {
        updateRowConfirmation: "Are you sure you want to update row data?",
      },
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
      additionalActions: {
        orderItems: "Order Items",
        downloadAsPdf: "Download as PDF",
        statusHistory: "Status History",
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

    orderItems: {
      table: {
        headers: {
          name: "Item Name",
          count: "Count",
          cost: "Cost",
          vat: "VAT",
          costWithVat: "Cost with VAT",
        },
      },
      form: {
        labels: {
          name: "Item Name",
          count: "Count",
          cost: "Cost",
          vat: "VAT",
          costWithVat: "Cost with VAT",
        },
      },
    },
  },
  orderCategories: {
    table: {
      headers: {
        name: "Category Name",
        slug: "Category Slug",
      },
    },
    form: {
      labels: {
        name: "Category Name",
        slug: "Category Slug",
      },
    },
  },
  users: {
    table: {
      headers: {
        firstname: "First Name",
        lastname: "Last Name",
        email: "Email",
        isAdmin: "Is User Admin?",
      },
    },
    form: {
      labels: {
        firstname: "First Name",
        lastname: "Last Name",
        email: "Email",
        password: "Password",
        passwordConfirmation: "Password Again",
        isAdmin: "Role",
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
  actionsMenu: {
    removal: {
      dialog: {
        texts: {
          confirmation: "Are you sure you want to remove this item?",
        },
      },
    },
  },
}
export default texts
