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
import Tooltip from '@mui/material/Tooltip';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Checkbox, FormControlLabel } from "@mui/material";
import { Card, OutlinedInput } from '@mui/material';



export default function Home() {
  const [selectedBox, setSelectedBox] = useState(null);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isHeaderCollapsed, setHeaderCollapsed] = useState(false);
  const [filters, setFilters] = useState({
    frontBack: '',
    phase: '',
    bayNumber: '',
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

  const getPhase = (boxIndex) => {
    if (boxIndex <= 15) return 'Phase 1';
    if (boxIndex > 15 && boxIndex <= 30) return 'Phase 2';
    if (boxIndex > 30) return 'Phase 3';
    return 'Unknown Phase';
  };

  const filterMatch = (boxIndex, prefix) => {
    const phase = getPhase(boxIndex);
    const phaseMatch =
      filters.phase === '' || filters.phase === phase;

    const frontBackMatch =
      filters.frontBack === '' || filters.frontBack === prefix;

    const bayNumberMatch =
      filters.bayNumber === '' || parseInt(filters.bayNumber) === boxIndex;

    return phaseMatch && frontBackMatch && bayNumberMatch;
  };


  const renderBoxes = (phase1, phase2, phase3, prefix) => {
    return [...Array(3)].map((_, rowIndex) => (
      <div key={rowIndex} className="flex gap-1 mb-1">
        <div className="flex gap-1 border-r border-yellow-600 pr-1">
          {phase1.slice(rowIndex * 5, rowIndex * 5 + 5).map((boxIndex) => {
            const disabled = !filterMatch(boxIndex, prefix);
            const phase = getPhase(boxIndex);
            return (
              <Tooltip
              key={prefix + boxIndex}
              title={
                <div className="text-center p-2">
                  <p className="text-sm font-semibold text-gray-700">Box {boxIndex}</p>
                  <p className="text-xs text-gray-500">{phase}</p>
                  <p className="text-xs text-gray-500">{prefix === 'F' ? 'Front' : 'Back'}</p>
                </div>
              }
              arrow
              classes={{
                tooltip: 'bg-white border border-gray-300 shadow-lg rounded-lg p-3', // Estilo del Tooltip
                arrow: 'text-white', // Color de la flecha
              }}
              PopperProps={{
                modifiers: [
                  {
                    name: 'offset',
                    options: {
                      offset: [0, 8], // Ajuste de posición si es necesario
                    },
                  },
                ],
              }}
            >
              <div
                className={`w-10 h-10 rounded-md ${selectedBox === prefix + boxIndex
                  ? 'bg-orange-500'
                  : disabled
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-yellow-100 border-yellow-600 cursor-pointer hover:bg-yellow-200 hover:shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out'
                  } border flex items-center justify-center`}
                onClick={() => handleBoxClick(prefix + boxIndex, disabled)}
              >
                <span className="text-black font-bold">{boxIndex}</span>
              </div>
            </Tooltip>
            );
          })}
        </div>
        <div className="flex gap-1 border-r border-green-600 pr-1">
          {phase2.slice(rowIndex * 5, rowIndex * 5 + 5).map((boxIndex) => {
            const disabled = !filterMatch(boxIndex, prefix);
            const phase = getPhase(boxIndex);
            return (
              <Tooltip
                key={prefix + boxIndex}
                title={
                  <div className="text-center p-2">
                    <p className="text-sm font-semibold text-gray-700">Box {boxIndex}</p>
                    <p className="text-xs text-gray-500">{phase}</p>
                    <p className="text-xs text-gray-500">{prefix === 'F' ? 'Front' : 'Back'}</p>
                  </div>
                }
                arrow
                classes={{
                  tooltip: 'bg-white border border-gray-300 shadow-md rounded-lg',
                  arrow: 'text-white',
                }}
              >
                <div
                  className={`w-10 h-10 rounded-md ${selectedBox === prefix + boxIndex
                    ? 'bg-orange-500'
                    : disabled
                      ? 'bg-gray-300 cursor-not-allowed'
                      : 'bg-green-100 border-green-600 cursor-pointer hover:bg-green-200 hover:shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out'
                    } border flex items-center justify-center`}
                  onClick={() => handleBoxClick(prefix + boxIndex, disabled)}
                >
                  <span className="text-black font-bold">{boxIndex}</span>
                </div>
              </Tooltip>
            );
          })}
        </div>
        <div className="flex gap-1">
          {phase3.slice(rowIndex * 6, rowIndex * 6 + 6).map((boxIndex) => {
            const disabled = !filterMatch(boxIndex, prefix);
            const phase = getPhase(boxIndex);
            return (
              <Tooltip
                key={prefix + boxIndex}
                title={
                  <div className="text-center p-2">
                    <p className="text-sm font-semibold text-gray-700">Box {boxIndex}</p>
                    <p className="text-xs text-gray-500">{phase}</p>
                    <p className="text-xs text-gray-500">{prefix === 'F' ? 'Front' : 'Back'}</p>
                  </div>
                }
                arrow
                classes={{
                  tooltip: 'bg-white border border-gray-300 shadow-md rounded-lg',
                  arrow: 'text-white',
                }}
              >
                <div
                  className={`w-10 h-10 rounded-md ${selectedBox === prefix + boxIndex
                    ? 'bg-orange-500'
                    : disabled
                      ? 'bg-gray-300 cursor-not-allowed'
                      : 'bg-teal-100 border-teal-600 cursor-pointer hover:bg-teal-200 hover:shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out'
                    } border flex items-center justify-center`}
                  onClick={() => handleBoxClick(prefix + boxIndex, disabled)}
                >
                  <span className="text-black font-bold">{boxIndex}</span>
                </div>
              </Tooltip>
            );
          })}
        </div>
      </div>
    ));
  };




  return (
    <main className="flex h-screen overflow-hidden">
      {/* Header con animación de colapsado */}
      <aside className={`bg-green-600 p-6 flex flex-col items-center transition-transform duration-300 rounded-r-3xl ${isHeaderCollapsed ? '-translate-x-full' : 'translate-x-0'}`}>
        <IconButton
          onClick={() => setHeaderCollapsed(!isHeaderCollapsed)}
          className="text-white hover:bg-green-600"
          style={{ width: '64px', height: '64px' }}
        >
          <MenuIcon style={{ fontSize: '36px' }} />
        </IconButton>
        {!isHeaderCollapsed && (
          <>
            <div className="bg-white w-16 h-16 rounded-full my-6"></div>
            <div className="flex flex-col items-center space-y-4">
              <div className="w-12 h-12 bg-white rounded-lg"></div>
              <div className="w-12 h-12 bg-white rounded-lg"></div>
            </div>
          </>
        )}
      </aside>

      {/* Botón flotante para abrir el menú cuando está colapsado */}
      {isHeaderCollapsed && (
        <IconButton
          onClick={() => setHeaderCollapsed(false)}
          className="fixed top-4 left-4 z-50 text-white bg-green-600 hover:bg-green-500 rounded-full"
          style={{ width: '64px', height: '64px' }}
        >
          <MenuIcon style={{ fontSize: '36px' }} />
        </IconButton>
      )}

      {/* Contenido principal centrado y ajustado */}
      <section className="flex-1 p-8 flex flex-col items-center justify-start mt-8">
        <div className="flex flex-col w-full max-w-4xl">
          {/* Filtros */}
          <div className="bg-white mb-8 p-6 rounded-lg shadow-lg w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {/* Front/Back Filter */}
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
                  <MenuItem value="F">Front</MenuItem>
                  <MenuItem value="B">Back</MenuItem>
                </Select>
              </FormControl>

              {/* Phase Filter */}
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

              {/* Bay Number Filter */}
              <TextField
                label="Bay Number"
                variant="outlined"
                className="w-full"
                name="bayNumber"
                value={filters.bayNumber}
                onChange={handleFilterChange}
                type="number"
              />

              {/* Customer Filter */}
              <TextField
                label="Customer"
                variant="outlined"
                className="w-full"
                name="customer"
                value={filters.customer}
                onChange={handleFilterChange}
              />

              {/* Product Filter */}
              <TextField
                label="Product"
                variant="outlined"
                className="w-full"
                name="product"
                value={filters.product}
                onChange={handleFilterChange}
              />

              {/* % of Bags Remaining del total Filter */}
              <TextField
                label="% of Bags Remaining"
                variant="outlined"
                className="w-full"
                name="bagsRemaining"
                value={filters.bagsRemaining}
                onChange={handleFilterChange}
                type="number"
              />


              {/* Locations with product/Empty Locations Filter */}
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filters.withProduct}
                    onChange={(e) => setFilters({ ...filters, withProduct: e.target.checked })}
                    name="withProduct"
                  />
                }
                label="Locations with product"
              />
            </div>
          </div>

          {/* Boxes */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg flex-1 w-full overflow-auto">
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <div className="text-left text-2xl font-bold mr-4 text-gray-700 tracking-wide uppercase" style={{ minWidth: "100px", letterSpacing: "0.1em" }}>
                  Front
                </div>                <div className="flex flex-col">
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
                <div className="text-left text-2xl font-bold mr-4 text-gray-700 tracking-wide uppercase" style={{ minWidth: "100px", letterSpacing: "0.1em" }}>
                  Back
                </div>                <div className="flex flex-col">
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
        PaperProps={{
          style: {
            width: '400px',
            borderTopLeftRadius: '24px',
            borderBottomLeftRadius: '24px',
          },
        }}
      >
        <Box p={3} textAlign="center" role="presentation">
          <Button onClick={closeDrawer} variant="contained" color="primary">
            Close
          </Button>
          <p className="mt-4">Box {selectedBox}</p>
        </Box>
      </Drawer>
    </main>
  );
}
