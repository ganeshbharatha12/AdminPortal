// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.



export const environment = {
  production: false,
  version:'3.1.1',
  // buildVersion:'',
  buildVersion:'Build:20240221.180012',
  //test
  apiUrl: "https://testadminapi.groupbenefitz.aitestpro.com",
  corporateClientId:"0",
  clientLogoDashBord: 'assets/img/logo.png',
  loginPageLogo:'assets/img/logo.png',


    //prod
    // apiUrl:"https://api-admin.groupbenefitz.net",
    // corporateClientId:"0",
    // clientLogoDashBord: 'assets/img/logo.png',
    // loginPageLogo:'assets/img/logo.png',




  // Sandbox:
  // apiUrl:"https://api-admin.groupbenefitz.org",
  // corporateClientId:"0",
  // clientLogoDashBord: 'assets/img/logo.png',
  // loginPageLogo:'assets/img/logo.png',


  //IBBMS
  //  apiUrl: "https://adminapi.igbms.com",
  //  corporateClientId:"0",
  //     clientLogoDashBord: '../../../assets/img/iGBMS-dashboad.png',
  //   loginPageLogo:'../../../assets/img/ibms.png',



  api: "https://testadminapi.groupbenefitz.aitestpro.com",

  app:{
    grp:"https://testapi.groupbenefitz.aitestpro.com/",
    formLink:"testausu"
  },
};





//******************************************************************** */
// let site='PRODUCTION';
// let site='TEST';
// let site='IGBMS';
// // let site='SANDBOX'
// export let environment;
// if(site=='TEST'){
//    environment = {
//     production: false,
//     apiUrl: "https://testadminapi.groupbenefitz.aitestpro.com",
//     corporateClientId:"0",
//     clientLogoDashBord: 'assets/img/logo.png',
//     loginPageLogo:'assets/img/logo.png',



//     api: "https://testadminapi.groupbenefitz.aitestpro.com",

//     app:{
//       grp:"https://testapi.groupbenefitz.aitestpro.com/",
//       formLink:"testausu"
//     },
//   };
// }else if(site=='PRODUCTION'){
//   environment = {
//     production: false,
//       apiUrl:"https://api-admin.groupbenefitz.net",
//       corporateClientId:"0",
//       clientLogoDashBord: 'assets/img/logo.png',
//       loginPageLogo:'assets/img/logo.png',

//     api: "https://testadminapi.groupbenefitz.aitestpro.com",

//     app:{
//       grp:"https://testapi.groupbenefitz.aitestpro.com/",
//       formLink:"testausu"
//     },
//   };
// } else if(site=='IGBMS'){
//   environment = {
//     production: false,
//     apiUrl: "https://adminapi.igbms.com",
//     corporateClientId:"0",
//     clientLogoDashBord: '../../../assets/img/iGBMS-dashboad.png',
//     loginPageLogo:'../../../assets/img/ibms.png',

//     api: "https://testadminapi.groupbenefitz.aitestpro.com",

//     app:{
//       grp:"https://testapi.groupbenefitz.aitestpro.com/",
//       formLink:"testausu"
//     },
//     // corporateClientId:"0"




//   };
// }else if(site=='SANDBOX'){
//   environment = {
//     production: false,
//     apiUrl:"https://api-admin.groupbenefitz.org",
//     corporateClientId:"0",

//     clientLogoDashBord: 'assets/img/logo.png',
//       loginPageLogo:'assets/img/logo.png',

//     api: "https://testadminapi.groupbenefitz.aitestpro.com",

//     app:{
//       grp:"https://testapi.groupbenefitz.aitestpro.com/",
//       formLink:"testausu"
//     },
//   };
// }




/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
