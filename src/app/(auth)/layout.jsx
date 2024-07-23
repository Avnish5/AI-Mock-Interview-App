import Footer from "../dashboard/_components/Footer";
import Header from "../dashboard/_components/Header";

function AuthLayout({children}) {
    return (
      <div>
        
        <Header/>
        <div>{children}</div>
<Footer/>
        
      </div>
    );
  }
  
  export default AuthLayout;