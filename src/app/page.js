'use client'
import { useState } from "react";
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function Home() {
  const [selectedBox, setSelectedBox] = useState(null);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [filters, setFilters] = useState({
    frontBack: '',
    bayNumber: '',
    phase: '',
    customer: '',
    product: '',
    withProduct: false,
    bagsRemaining: '',
  });

  const handleBoxClick = (id, disabled) => {
    if (disabled) return;
    if (selectedBox === id) {
      setDrawerOpen(false);
      setSelectedBox(null);
    } else {
      setSelectedBox(id);
      setDrawerOpen(true);
    }
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    setSelectedBox(null);
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const renderBoxes = (phase1, phase2, phase3, prefix) => {
    const filterMatch = (boxIndex) => {
      // Aquí puedes agregar la lógica para verificar si la box cumple con los filtros.
      return true;
    };

    return [...Array(3)].map((_, rowIndex) => (
      <div key={rowIndex} className="flex gap-2 mb-2">
        <div className="flex gap-2 border-r-2 border-yellow-600 pr-2">
          {phase1.slice(rowIndex * 5, rowIndex * 5 + 5).map((boxIndex) => {
            const disabled = !filterMatch(boxIndex);
            return (
              <div
                key={prefix + boxIndex}
                className={`w-10 h-10 rounded-md ${
                  selectedBox === prefix + boxIndex
                    ? 'bg-orange-500'
                    : disabled
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-yellow-100 border-yellow-600'
                } border-2 flex items-center justify-center`}
                onClick={() => handleBoxClick(prefix + boxIndex, disabled)}
              >
                <span className="text-black font-bold">{boxIndex}</span>
              </div>
            );
          })}
        </div>
        <div className="flex gap-2 border-r-2 border-green-600 pr-2">
          {phase2.slice(rowIndex * 5, rowIndex * 5 + 5).map((boxIndex) => {
            const disabled = !filterMatch(boxIndex);
            return (
              <div
                key={prefix + boxIndex}
                className={`w-10 h-10 rounded-md ${
                  selectedBox === prefix + boxIndex
                    ? 'bg-orange-500'
                    : disabled
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-green-100 border-green-600'
                } border-2 flex items-center justify-center`}
                onClick={() => handleBoxClick(prefix + boxIndex, disabled)}
              >
                <span className="text-black font-bold">{boxIndex}</span>
              </div>
            );
          })}
        </div>
        <div className="flex gap-2">
          {phase3.slice(rowIndex * 6, rowIndex * 6 + 6).map((boxIndex) => {
            const disabled = !filterMatch(boxIndex);
            return (
              <div
                key={prefix + boxIndex}
                className={`w-10 h-10 rounded-md ${
                  selectedBox === prefix + boxIndex
                    ? 'bg-orange-500'
                    : disabled
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-teal-100 border-teal-600'
                } border-2 flex items-center justify-center`}
                onClick={() => handleBoxClick(prefix + boxIndex, disabled)}
              >
                <span className="text-black font-bold">{boxIndex}</span>
              </div>
            );
          })}
        </div>
      </div>
    ));
  };

  return (
    <main className="flex h-screen overflow-hidden">
      {/* Header a la izquierda con bordes redondeados */}
      <aside className="bg-green-600 w-16 p-8 flex flex-col items-center rounded-r-full">
        <div className="bg-white w-12 h-12 rounded-full mb-4"></div>
        <div className="space-y-4">
          <div className="w-8 h-8 bg-white"></div>
          <div className="w-8 h-8 bg-white"></div>
        </div>
      </aside>

      {/* Contenido principal */}
      <section className="flex-1 p-8 flex flex-col items-start justify-start ml-8 mt-8">
        <div className="flex flex-col w-full max-w-5xl">
          {/* Filtros */}
          <div className="bg-white mb-8 p-4 rounded-lg shadow-md w-11/12 ml-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <FormControl variant="outlined" className="w-full">
                <InputLabel>Front/Back</InputLabel>
                <Select
                  value={filters.frontBack}
                  onChange={handleFilterChange}
                  label="Front/Back"
                  name="frontBack"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="Front">Front</MenuItem>
                  <MenuItem value="Back">Back</MenuItem>
                </Select>
              </FormControl>

              <TextField
                label="Bay Number"
                variant="outlined"
                className="w-full"
                name="bayNumber"
                value={filters.bayNumber}
                onChange={handleFilterChange}
              />

              <FormControl variant="outlined" className="w-full">
                <InputLabel>Phase</InputLabel>
                <Select
                  value={filters.phase}
                  onChange={handleFilterChange}
                  label="Phase"
                  name="phase"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="Phase 1">Phase 1</MenuItem>
                  <MenuItem value="Phase 2">Phase 2</MenuItem>
                  <MenuItem value="Phase 3">Phase 3</MenuItem>
                </Select>
              </FormControl>

              <TextField
                label="Customer"
                variant="outlined"
                className="w-full"
                name="customer"
                value={filters.customer}
                onChange={handleFilterChange}
              />

              <TextField
                label="Product"
                variant="outlined"
                className="w-full"
                name="product"
                value={filters.product}
                onChange={handleFilterChange}
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={filters.withProduct}
                    onChange={(e) =>
                      setFilters({ ...filters, withProduct: e.target.checked })
                    }
                    name="withProduct"
                    color="primary"
                  />
                }
                label="With Product"
              />

              <TextField
                label="% of Bags Remaining"
                variant="outlined"
                className="w-full"
                name="bagsRemaining"
                value={filters.bagsRemaining}
                onChange={handleFilterChange}
              />
            </div>
          </div>

          {/* Boxes */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-md flex-1 w-11/12 ml-4">
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <div className="text-left text-2xl font-bold mr-4" style={{ minWidth: "80px" }}>Front</div>
                <div className="flex flex-col">
                  {renderBoxes(
                    Array.from({ length: 15 }, (_, i) => i + 1),        // Phase 1: 1-15
                    Array.from({ length: 15 }, (_, i) => i + 16),       // Phase 2: 16-30
                    Array.from({ length: 18 }, (_, i) => i + 31),       // Phase 3: 31-48
                    "F"  // Prefijo para las boxes de "Front"
                  )}
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center mb-4">
                <div className="text-left text-2xl font-bold mr-4" style={{ minWidth: "80px" }}>Back</div>
                <div className="flex flex-col">
                  {renderBoxes(
                    Array.from({ length: 15 }, (_, i) => i + 1),        // Phase 1: 1-15
                    Array.from({ length: 15 }, (_, i) => i + 16),       // Phase 2: 16-30
                    Array.from({ length: 18 }, (_, i) => i + 31),       // Phase 3: 31-48
                    "B"  // Prefijo para las boxes de "Back"
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menú derecho - Usando Drawer */}
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={closeDrawer}
      >
        <Box p={2} width="250px" textAlign="center" role="presentation">
          <Button onClick={closeDrawer}>Close</Button>
          <p>Menú para la box {selectedBox}</p>
        </Box>
      </Drawer>
    </main>
  );
}
