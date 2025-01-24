'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Search, SortAsc, SortDesc, Info } from 'lucide-react';
import _ from 'lodash';

const RunningShoeComparator = ({ initialData = [] }) => {
  const [shoes, setShoes] = useState(initialData);
  const [sortConfig, setSortConfig] = useState({ key: 'price', direction: 'asc' });
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    brand: 'all',
    category: 'all',
    usage: 'all',
    supportType: 'all',
  });
  const [expandedRow, setExpandedRow] = useState(null);

  const handleSort = (key) => {
    const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    setSortConfig({ key, direction });
    const sortedShoes = _.orderBy(shoes, [key], [direction]);
    setShoes(sortedShoes);
  };

  const filterShoes = () => {
    let filtered = initialData;

    if (searchTerm) {
      filtered = filtered.filter(shoe => 
        shoe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shoe.brand.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filters.brand !== 'all') {
      filtered = filtered.filter(shoe => shoe.brand === filters.brand);
    }
    if (filters.category !== 'all') {
      filtered = filtered.filter(shoe => shoe.category === filters.category);
    }
    if (filters.usage !== 'all') {
      filtered = filtered.filter(shoe => shoe.usage === filters.usage);
    }
    if (filters.supportType !== 'all') {
      filtered = filtered.filter(shoe => shoe.supportType === filters.supportType);
    }

    setShoes(filtered);
  };

  useEffect(() => {
    filterShoes();
  }, [searchTerm, filters, initialData]);

  const brands = _.uniq(initialData.map(shoe => shoe.brand));
  const categories = _.uniq(initialData.map(shoe => shoe.category));
  const usages = _.uniq(initialData.map(shoe => shoe.usage));
  const supportTypes = _.uniq(initialData.map(shoe => shoe.supportType));

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Comparateur de Chaussures de Running</CardTitle>
        <div className="flex flex-wrap gap-4">
          <div className="relative">
            <Search className="absolute left-2 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher..."
              className="pl-8 pr-4 py-2 border rounded-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <select
            className="p-2 border rounded-md"
            value={filters.brand}
            onChange={(e) => setFilters({...filters, brand: e.target.value})}
          >
            <option value="all">Toutes les marques</option>
            {brands.map(brand => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>

          <select
            className="p-2 border rounded-md"
            value={filters.category}
            onChange={(e) => setFilters({...filters, category: e.target.value})}
          >
            <option value="all">Toutes les catégories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          <select
            className="p-2 border rounded-md"
            value={filters.usage}
            onChange={(e) => setFilters({...filters, usage: e.target.value})}
          >
            <option value="all">Tous les usages</option>
            {usages.map(usage => (
              <option key={usage} value={usage}>{usage}</option>
            ))}
          </select>

          <select
            className="p-2 border rounded-md"
            value={filters.supportType}
            onChange={(e) => setFilters({...filters, supportType: e.target.value})}
          >
            <option value="all">Tous les types de support</option>
            {supportTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </CardHeader>

      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="p-2 text-left cursor-pointer" onClick={() => handleSort('name')}>
                  <div className="flex items-center gap-1">
                    Modèle
                    {sortConfig.key === 'name' && (
                      sortConfig.direction === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />
                    )}
                  </div>
                </th>
                <th className="p-2 text-left cursor-pointer" onClick={() => handleSort('price')}>
                  <div className="flex items-center gap-1">
                    Prix
                    {sortConfig.key === 'price' && (
                      sortConfig.direction === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />
                    )}
                  </div>
                </th>
                <th className="p-2 text-left">Usage</th>
                <th className="p-2 text-left cursor-pointer" onClick={() => handleSort('weight')}>
                  <div className="flex items-center gap-1">
                    Poids (g)
                    {sortConfig.key === 'weight' && (
                      sortConfig.direction === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />
                    )}
                  </div>
                </th>
                <th className="p-2 text-left">Drop (mm)</th>
                <th className="p-2 text-left">Stack Height (mm)</th>
                <th className="p-2 text-left">Durabilité (km)</th>
                <th className="p-2 text-left">Détails</th>
              </tr>
            </thead>
            <tbody>
              {shoes.map((shoe) => (
                <React.Fragment key={shoe.id}>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="p-2">
                      <div className="font-medium">{shoe.name}</div>
                      <div className="text-sm text-gray-500">{shoe.brand}</div>
                    </td>
                    <td className="p-2">
                      <div className="font-medium">{shoe.price} €</div>
                      <a href={shoe.storeUrl} target="_blank" rel="noopener noreferrer" 
                         className="text-sm text-blue-600 hover:underline">
                        {shoe.store}
                      </a>
                    </td>
                    <td className="p-2">
                      <div>{shoe.usage}</div>
                      <div className="text-sm text-gray-500">{shoe.category}</div>
                    </td>
                    <td className="p-2">{shoe.weight}</td>
                    <td className="p-2">{shoe.drop}</td>
                    <td className="p-2">{shoe.stackHeight.heel}/{shoe.stackHeight.forefoot}</td>
                    <td className="p-2">{shoe.estimatedDurability}</td>
                    <td className="p-2">
                      <button
                        className="p-1 hover:bg-gray-100 rounded"
                        onClick={() => setExpandedRow(expandedRow === shoe.id ? null : shoe.id)}
                      >
                        <Info className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                  {expandedRow === shoe.id && (
                    <tr className="bg-gray-50">
                      <td colSpan="8" className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <h3 className="font-medium mb-2">Spécifications techniques</h3>
                            <p>Mousse: {shoe.midsoleFoam}</p>
                            <p>Plaque: {shoe.plate}</p>
                            <p>Empeigne: {shoe.upperMaterial}</p>
                            <p>Largeur toe-box: {shoe.toeBoxWidth}</p>
                          </div>
                          <div>
                            <h3 className="font-medium mb-2">Usage recommandé</h3>
                            <p>Type de support: {shoe.supportType}</p>
                            <p>Terrain: {shoe.terrain}</p>
                          </div>
                          <div>
                            <h3 className="font-medium mb-2">Historique des prix</h3>
                            {shoe.priceHistory.map((history, index) => (
                              <p key={index}>{history.date}: {history.price}€</p>
                            ))}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default RunningShoeComparator;
