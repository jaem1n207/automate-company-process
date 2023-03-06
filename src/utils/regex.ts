export const regex = {
  kebakCase: new RegExp("^[a-z]+(?:-[a-z]+)*$"),
  email: new RegExp("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
  password: new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})"),
  url: new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})"),
  directoryPath: new RegExp("^(.+)/([^/]+)$"),
};
