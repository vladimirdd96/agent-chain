import { motion } from "framer-motion";
import { HTMLMotionProps } from "framer-motion";

interface MotionDivProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
}

const MotionDiv: React.FC<MotionDivProps> = ({ children, ...props }) => {
  return <motion.div {...props}>{children}</motion.div>;
};

export default MotionDiv;
