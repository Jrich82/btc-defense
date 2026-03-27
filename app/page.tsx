import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ThreatMatrix from "./components/ThreatMatrix";
import QuantumTimeline from "./components/QuantumTimeline";
import DefenseGuide from "./components/DefenseGuide";
import AddressAuditor from "./components/AddressAuditor";
import Updates from "./components/Updates";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <ThreatMatrix />
      <QuantumTimeline />
      <DefenseGuide />
      <AddressAuditor />
      <Updates />
      <Footer />
    </main>
  );
}
