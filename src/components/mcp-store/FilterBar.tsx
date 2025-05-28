"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FunnelIcon,
  XMarkIcon,
  CheckIcon,
  AdjustmentsHorizontalIcon,
} from "@heroicons/react/24/outline";
import { MCPService, MCPServiceFilter, MCPCategory } from "@/types/mcp";

interface FilterBarProps {
  services: MCPService[];
  filters: MCPServiceFilter;
  onFiltersChange: (filters: MCPServiceFilter) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  services,
  filters,
  onFiltersChange,
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Extract unique values from services
  const categories = Array.from(new Set(services.map((s) => s.category)));
  const chains = Array.from(
    new Set(services.flatMap((s) => s.supportedChains))
  );
  const features = Array.from(new Set(services.flatMap((s) => s.features)));
  const integrationModes = Array.from(
    new Set(services.flatMap((s) => s.integrationModes.map((m) => m.type)))
  );

  const handleCategoryToggle = (category: MCPCategory) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category];

    onFiltersChange({ ...filters, categories: newCategories });
  };

  const handleChainToggle = (chain: string) => {
    const newChains = filters.chains.includes(chain)
      ? filters.chains.filter((c) => c !== chain)
      : [...filters.chains, chain];

    onFiltersChange({ ...filters, chains: newChains });
  };

  const handleFeatureToggle = (feature: string) => {
    const newFeatures = filters.features.includes(feature)
      ? filters.features.filter((f) => f !== feature)
      : [...filters.features, feature];

    onFiltersChange({ ...filters, features: newFeatures });
  };

  const handleIntegrationModeToggle = (mode: string) => {
    const newModes = filters.integrationModes.includes(mode)
      ? filters.integrationModes.filter((m) => m !== mode)
      : [...filters.integrationModes, mode];

    onFiltersChange({ ...filters, integrationModes: newModes });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      search: "",
      categories: [],
      chains: [],
      features: [],
      integrationModes: [],
      showFreeOnly: false,
      showVerifiedOnly: false,
    });
  };

  const activeFilterCount =
    filters.categories.length +
    filters.chains.length +
    filters.features.length +
    filters.integrationModes.length +
    (filters.showFreeOnly ? 1 : 0) +
    (filters.showVerifiedOnly ? 1 : 0);

  const FilterPill: React.FC<{
    label: string;
    isActive: boolean;
    onClick: () => void;
    color?: string;
  }> = ({ label, isActive, onClick, color = "purple" }) => (
    <motion.button
      onClick={onClick}
      className={`
        relative px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300
        ${
          isActive
            ? `bg-${color}-500/20 text-${color}-300 border border-${color}-500/40`
            : "bg-white/10 text-white/60 border border-white/20 hover:border-white/40"
        }
      `}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      layout
    >
      <div className="flex items-center gap-1.5">
        {isActive && <CheckIcon className="w-3 h-3" />}
        <span>{label}</span>
      </div>
    </motion.button>
  );

  return (
    <div className="space-y-4">
      {/* Main Filter Row */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 text-white/70">
          <FunnelIcon className="w-5 h-5" />
          <span className="text-sm font-medium">Filters</span>
          {activeFilterCount > 0 && (
            <span className="px-2 py-0.5 bg-purple-500/20 text-purple-300 text-xs rounded-full">
              {activeFilterCount}
            </span>
          )}
        </div>

        {/* Quick Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <FilterPill
            label="Free Only"
            isActive={filters.showFreeOnly || false}
            onClick={() =>
              onFiltersChange({
                ...filters,
                showFreeOnly: !filters.showFreeOnly,
              })
            }
            color="green"
          />
          <FilterPill
            label="Verified"
            isActive={filters.showVerifiedOnly || false}
            onClick={() =>
              onFiltersChange({
                ...filters,
                showVerifiedOnly: !filters.showVerifiedOnly,
              })
            }
            color="blue"
          />
        </div>

        {/* Advanced Filters Toggle */}
        <motion.button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 rounded-full text-sm font-medium text-white/70 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <AdjustmentsHorizontalIcon className="w-4 h-4" />
          Advanced
        </motion.button>

        {/* Clear All */}
        {activeFilterCount > 0 && (
          <motion.button
            onClick={clearAllFilters}
            className="flex items-center gap-1 px-3 py-1.5 bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 rounded-full text-sm font-medium text-red-300 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <XMarkIcon className="w-3 h-3" />
            Clear All
          </motion.button>
        )}
      </div>

      {/* Advanced Filters */}
      <AnimatePresence>
        {showAdvanced && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="space-y-4 overflow-hidden"
          >
            {/* Categories */}
            <div>
              <h4 className="text-sm font-medium text-white/70 mb-2">
                Categories
              </h4>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <FilterPill
                    key={category}
                    label={category}
                    isActive={filters.categories.includes(category)}
                    onClick={() => handleCategoryToggle(category)}
                  />
                ))}
              </div>
            </div>

            {/* Chains */}
            <div>
              <h4 className="text-sm font-medium text-white/70 mb-2">
                Supported Chains
              </h4>
              <div className="flex flex-wrap gap-2">
                {chains.slice(0, 8).map((chain) => (
                  <FilterPill
                    key={chain}
                    label={chain}
                    isActive={filters.chains.includes(chain)}
                    onClick={() => handleChainToggle(chain)}
                    color="blue"
                  />
                ))}
                {chains.length > 8 && (
                  <span className="px-3 py-1.5 text-sm text-white/50">
                    +{chains.length - 8} more
                  </span>
                )}
              </div>
            </div>

            {/* Integration Modes */}
            <div>
              <h4 className="text-sm font-medium text-white/70 mb-2">
                Integration Modes
              </h4>
              <div className="flex flex-wrap gap-2">
                {integrationModes.map((mode) => (
                  <FilterPill
                    key={mode}
                    label={mode}
                    isActive={filters.integrationModes.includes(mode)}
                    onClick={() => handleIntegrationModeToggle(mode)}
                    color="cyan"
                  />
                ))}
              </div>
            </div>

            {/* Popular Features */}
            <div>
              <h4 className="text-sm font-medium text-white/70 mb-2">
                Popular Features
              </h4>
              <div className="flex flex-wrap gap-2">
                {features.slice(0, 10).map((feature) => (
                  <FilterPill
                    key={feature}
                    label={feature}
                    isActive={filters.features.includes(feature)}
                    onClick={() => handleFeatureToggle(feature)}
                    color="green"
                  />
                ))}
                {features.length > 10 && (
                  <span className="px-3 py-1.5 text-sm text-white/50">
                    +{features.length - 10} more
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FilterBar;
