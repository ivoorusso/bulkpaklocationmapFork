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
    const allBoxes = [...phase1, ...phase2, ...phase3];

    const getBoxColor = (boxIndex) => {
      if (boxIndex <= 15) return { color: 'yellow-100', borderColor: 'yellow-600' };
      if (boxIndex <= 30) return { color: 'green-100', borderColor: 'green-600' };
      return { color: 'teal-100', borderColor: 'teal-600' };
    };

    return (
      <div className="flex gap-2 pr-4 overflow-x-auto">
        {allBoxes.map((boxIndex) => {
          const disabled = !filterMatch(boxIndex, prefix);
          const phase = getPhase(boxIndex);
          const { color, borderColor } = getBoxColor(boxIndex);

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
                tooltip: 'custom-tooltip',
                arrow: 'custom-tooltip-arrow',
              }}
            >
              <div
                className={`w-16 h-16 rounded-md ${selectedBox === prefix + boxIndex
                  ? 'bg-orange-500'
                  : disabled
                    ? 'bg-gray-300 cursor-not-allowed'
                    : `bg-${color} border-${borderColor} cursor-pointer hover:bg-yellow-200 hover:shadow-lg transform transition-all duration-300 ease-in-out`
                  } border flex items-center justify-center`}
                onClick={() => handleBoxClick(prefix + boxIndex, disabled)}
              >
                <span className="text-black font-bold">{boxIndex}</span>
              </div>
            </Tooltip>
          );
        })}
      </div>
    );
  };





  return (
    <main className="flex flex-col h-screen relative">
      {/* Header con animación de colapsado y superpuesto al contenido */}
      <aside
        className={`menu-container fixed top-0 left-0 h-full bg-white shadow-lg z-30 transition-transform duration-300 ease-in-out ${isHeaderCollapsed ? '-translate-x-full' : 'translate-x-0'}`}
        style={{ width: '250px' }} 
      >
        {!isHeaderCollapsed && (
          <>
            {/* Button over the logo to close the menu */}
            <IconButton
              onClick={() => setHeaderCollapsed(true)} 
              className="absolute left-4 top-4 bg-white rounded-full p-2 shadow-lg z-50" 
            >
              <MenuIcon style={{ fontSize: '36px', color: 'black' }} /> 
            </IconButton>

            <div className="menu-logo p-4"></div>
            <div className="flex flex-col items-center space-y-4 p-4">
              <div className="menu-item"></div>
              <div className="menu-item"></div>
            </div>
          </>
        )}
      </aside>

      {/* Floating button to open the menu when collapsed */}
      {isHeaderCollapsed && (
        <IconButton
          onClick={() => setHeaderCollapsed(false)} 
          className="fixed top-4 left-4 z-40 bg-white p-2 rounded-full shadow-lg menu-fixed-icon-button"
        >
          <MenuIcon style={{ fontSize: '36px' }} />
        </IconButton>
      )}


      <section className="flex-1 p-4 flex flex-col items-center justify-start overflow-auto relative mt-24"> 
        <div className="flex flex-col w-full max-w-full lg:max-w-7xl">

          <div className="bg-white mb-8 p-6 rounded-lg shadow-lg w-full">
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

          {/* Boxes Container */}
          <div className="bg-gray-100 p-8 rounded-lg shadow-lg w-full lg:mt-8 overflow-x-auto"> 
            <div className="mb-6">
              <div className="flex items-center mb-4">
                {/* Fixed width for Front label */}
                <div className="text-left text-2xl font-bold mr-4 text-gray-700 uppercase tracking-wide" style={{ minWidth: "120px" }}>
                  Front
                </div>
                <div className="flex flex-wrap gap-4">
                  {renderBoxes(
                    Array.from({ length: 15 }, (_, i) => i + 1),
                    Array.from({ length: 15 }, (_, i) => i + 16),
                    Array.from({ length: 18 }, (_, i) => i + 31),
                    "F"
                  )}
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center mb-4">
                {/* Fixed width for Back label */}
                <div className="text-left text-2xl font-bold mr-4 text-gray-700 uppercase tracking-wide" style={{ minWidth: "120px" }}>
                  Back
                </div>
                <div className="flex flex-wrap gap-4">
                  {renderBoxes(
                    Array.from({ length: 15 }, (_, i) => i + 1),
                    Array.from({ length: 15 }, (_, i) => i + 16),
                    Array.from({ length: 18 }, (_, i) => i + 31),
                    "B"
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menú derecho */}
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


