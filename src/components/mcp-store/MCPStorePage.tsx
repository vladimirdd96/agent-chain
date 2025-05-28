"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/outline";
import { MCPService, MCPServiceFilter, MCPCategory } from "@/types/mcp";
import MCPServiceAPI from "@/services/mcpService";
import MCPServiceCard from "./MCPServiceCard";
import MCPServiceModal from "./MCPServiceModal";
import PublishServiceModal from "./PublishServiceModal";
import FilterBar from "./FilterBar";
import MCPStoreHero from "./MCPStoreHero";

const MCPStorePage: React.FC = () => {
  const [services, setServices] = useState<MCPService[]>([]);
  const [filteredServices, setFilteredServices] = useState<MCPService[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedService, setSelectedService] = useState<MCPService | null>(
    null
  );
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [filters, setFilters] = useState<MCPServiceFilter>({
    search: "",
    categories: [],
    chains: [],
    features: [],
    integrationModes: [],
    showFreeOnly: false,
    showVerifiedOnly: false,
  });

  useEffect(() => {
    loadServices();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [services, filters, searchTerm]);

  const loadServices = async () => {
    try {
      setLoading(true);
      const data = await MCPServiceAPI.getAllServices();
      setServices(data);
    } catch (error) {
      console.error("Error loading MCP services:", error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...services];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (service) =>
          service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          service.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          service.features.some((feature) =>
            feature.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    // Category filter
    if (filters.categories.length > 0) {
      filtered = filtered.filter((service) =>
        filters.categories.includes(service.category)
      );
    }

    // Chain filter
    if (filters.chains.length > 0) {
      filtered = filtered.filter((service) =>
        service.supportedChains.some((chain) => filters.chains.includes(chain))
      );
    }

    // Feature filter
    if (filters.features.length > 0) {
      filtered = filtered.filter((service) =>
        service.features.some((feature) => filters.features.includes(feature))
      );
    }

    // Integration mode filter
    if (filters.integrationModes.length > 0) {
      filtered = filtered.filter((service) =>
        service.integrationModes.some((mode) =>
          filters.integrationModes.includes(mode.type)
        )
      );
    }

    // Free only filter
    if (filters.showFreeOnly) {
      filtered = filtered.filter((service) => service.price === 0);
    }

    // Verified only filter
    if (filters.showVerifiedOnly) {
      filtered = filtered.filter((service) => service.isVerified);
    }

    setFilteredServices(filtered);
  };

  const handleServiceClick = (service: MCPService) => {
    setSelectedService(service);
  };

  const handleCloseServiceModal = () => {
    setSelectedService(null);
  };

  const handlePublishSuccess = async (newService: MCPService) => {
    setServices((prev) => [newService, ...prev]);
    setShowPublishModal(false);
  };

  const handleFilterChange = (newFilters: MCPServiceFilter) => {
    setFilters(newFilters);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <MCPStoreHero />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Publish Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-white/50" />
            </div>
            <input
              type="text"
              placeholder="Search MCP services, features, or chains..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
            />
          </div>

          {/* Publish Button */}
          <motion.button
            onClick={() => setShowPublishModal(true)}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-xl font-medium transition-all duration-300 transform hover:scale-105"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <PlusIcon className="w-5 h-5" />
            Publish MCP Service
          </motion.button>
        </div>

        {/* Filter Bar */}
        <FilterBar
          services={services}
          filters={filters}
          onFiltersChange={handleFilterChange}
        />

        {/* Services Grid */}
        <div className="mt-8">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="h-64 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl animate-pulse"
                />
              ))}
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={filteredServices.length}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredServices.map((service) => (
                  <motion.div key={service.id} variants={cardVariants} layout>
                    <MCPServiceCard
                      service={service}
                      onClick={() => handleServiceClick(service)}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          )}

          {/* No Results */}
          {!loading && filteredServices.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-white mb-2">
                No services found
              </h3>
              <p className="text-white/60 max-w-md mx-auto">
                Try adjusting your search criteria or filters to find what
                you're looking for.
              </p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Service Details Modal */}
      <MCPServiceModal
        service={selectedService}
        isOpen={!!selectedService}
        onClose={handleCloseServiceModal}
      />

      {/* Publish Service Modal */}
      <PublishServiceModal
        isOpen={showPublishModal}
        onClose={() => setShowPublishModal(false)}
        onSuccess={handlePublishSuccess}
      />
    </div>
  );
};

export default MCPStorePage;
