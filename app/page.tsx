import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ThreatMatrix from "./components/ThreatMatrix";
import QuantumTimeline from "./components/QuantumTimeline";
import DefenseGuide from "./components/DefenseGuide";
import AddressAuditor from "./components/AddressAuditor";
import Updates from "./components/Updates";
import BIP360Explorer from "./components/BIP360Explorer";
import BIPTracker from "./components/BIPTracker";
import QuantumCountdown from "./components/QuantumCountdown";
import OpSecChecklist from "./components/OpSecChecklist";
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
      <BIP360Explorer />
      <BIPTracker />
      <QuantumCountdown />
      <OpSecChecklist />
      <Footer />
    </main>
  );
}
