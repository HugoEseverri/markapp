import Footer from "@/components/Footer/Footer";
import Caracteristicas from "@/components/Home/Características/Características";
import Down from "@/components/Home/Down/Down";
import LowBody from "@/components/Home/LowBody/LowerBody";
import MiddleBody from "@/components/Home/MiddleBody/MiddleBody";
import MiddleLowBody from "@/components/Home/MiddleLowBody/MiddleLowBody";
import UpperBody from "@/components/Home/UpperBody/UpperBody";
import MarkdownEditor from "@/components/Markdown";
import Navbar from "@/components/Navbar/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar/>
      <UpperBody/>
      <MiddleBody/>
      <MiddleLowBody/>
      <LowBody/>
      <Down/>
      <Caracteristicas/>
      <Footer/>
    </div>
  );
}
