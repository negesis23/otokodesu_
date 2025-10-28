import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Tab {
    title: string;
    content: React.ReactNode;
}

interface TabsProps {
    tabs: Tab[];
}

const Tabs: React.FC<TabsProps> = ({ tabs }) => {
    const [selectedTab, setSelectedTab] = useState(0);

    return (
        <div className="w-full">
            <div className="flex items-center border-b border-outline-variant/30 mb-4">
                {tabs.map((tab, i) => (
                    <button
                        key={tab.title}
                        className={`relative py-3 px-5 font-medium transition text-lg ${
                            selectedTab === i ? 'text-primary' : 'text-on-surface-variant hover:text-on-surface'
                        }`}
                        onClick={() => setSelectedTab(i)}
                    >
                        {tab.title}
                        {selectedTab === i && (
                            <motion.div
                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                                layoutId="underline"
                            />
                        )}
                    </button>
                ))}
            </div>
            <div>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={selectedTab}
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -10, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {tabs[selectedTab].content}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Tabs;