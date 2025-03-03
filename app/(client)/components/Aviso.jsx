import { motion, AnimatePresence } from "framer-motion";
export default function Aviso({ mensaje, visible }) {
    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.5 }}
                    className="fixed bottom-10 right-4 bg-red-400 text-white px-4 py-2 rounded shadow-lg"
                >
                    {mensaje}
                </motion.div>
            )}
        </AnimatePresence>
    )
};
