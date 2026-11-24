// =====================================================================
//  CONFIGURACIÓN DE TU TIENDA
// =====================================================================
// 1. Pega aquí la configuración de tu app web de Firebase
//    (Consola de Firebase > Configuración del proyecto > Tus apps > SDK config).
//    Estos datos no son secretos: la seguridad la dan las reglas de firestore.rules.
window.FIREBASE_CONFIG = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};

// 2. Correo(s) de quien gestiona la tienda.
//    Deben ser los mismos que pongas en firestore.rules.
window.ADMIN_EMAILS = ["tu-correo@ejemplo.com"];

// Si dejas apiKey vacío, la app funciona en modo demostración
// y guarda todo solo en el navegador de cada persona.
