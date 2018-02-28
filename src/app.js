class Login {
  constructor() {
    super ();

    this.loginName = [];
    this.loginPassword = [];
  }
  loginUser() {
    RedOrgBrukere.finnBruker(this.refs.loginName.value, this.refs.loginPassword.value, () => {
      this.refs.loginName.value = "";
      this.refs.loginPassword.value = "";

      this.forceUpdate();
    })
  }
