import { Dimensions } from "react-native";
const screenHeight = Dimensions.get("window").height;
const style = {
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  scrollsignup: {
    flex: 1,
  },

  helloContainer: {
    marginTop: 30,
    marginBottom: 40,
  },
  helloText: {
    textAlign: "center",
    fontSize: 70,
    fontWeight: "700",
    color: "#66CCFF",
  },
  signInText: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    color: "#004C99",
  },

  areasignup: {
    flex: 2,
    alignItems: "center",
    justifyContent: "top",
  },
  inputsignup: {
    flexDirection: "column",
    width: "94%",
    alignItems: "center",
    height: 80,
  },
  groupinput: {
    width: "100%",
    shadowColor: "#000",
    elevation: 6,
    height: 60,
  },

  icon: {
    position: "absolute",
    left: "3%",
    zIndex: 1,
    top: "45%",
    transform: [{ translateY: -12 }],
    color: "#8DA9D2",
  },
  input: {
    width: "100%",
    backgroundColor: "#FCFFFF",
    height: 60,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingLeft: 60,
    fontSize: 20,
    flex: 1,
  },
  btnlogin: {
    width: "100%",
    alignItems: "center",
    justifyContent: "top",
  },
  button: {
    width: "80%",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#66CCFF",
    paddingVertical: 19,
    paddingHorizontal: 24,
    marginVertical: 10,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 25,
    fontWeight: 700,
  },
  iconShowPassword: {
    position: "absolute",
    right: "10%",
    zIndex: 1,
    top: "70%",
    transform: [{ translateY: -12 }],
    color: "#8DA9D2",
  },

  switchlogin: {
    alignItems: "center",
    flex: 0.3,
    marginTop: 20,
  },
  textBottom: {
    fontSize: 16,
  },
  create: {
    textDecorationLine: "underline",
    fontSize: 18,
    color: "#009999",
    fontWeight: 700,
  },
  error: {
    width: "100%",
    alignItems: "top",
    justifyContent: "left",
    marginLeft: 20,
  },

  errorText: {
    color: "red",
  },
};
export default style;
