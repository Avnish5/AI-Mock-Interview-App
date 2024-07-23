import Footer from "../dashboard/_components/Footer";
import Header from "../dashboard/_components/Header";

function AuthLayout({children}) {
    return (
      <div>
        
        
        <div>{children}</div>

        
      </div>
    );
  }
  
  export default AuthLayout;