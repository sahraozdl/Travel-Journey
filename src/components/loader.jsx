import { FallingLines} from "react-loader-spinner";

export default function Loader(){
 return (
  <FallingLines 
  color="#780000"
  width="100"
  visible={true}
  ariaLabel="falling-circles-loading"
    />
 )
}