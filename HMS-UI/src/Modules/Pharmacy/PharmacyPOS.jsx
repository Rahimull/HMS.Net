import usePharmacyPOS from "./hooks/usePharmacyPOS";
import PharmacyPageUI from "./PharmacyPageUi";

const PharmacyPOS = () => {
  const pos = usePharmacyPOS();

  return <PharmacyPageUI {...pos} />;
};

export default PharmacyPOS;