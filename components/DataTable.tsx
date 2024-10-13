import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

interface DataItem {
  id: number;
  listId: number;
  name: string | null;
}

interface DataTableProps {
  data: DataItem[];
}

export function DataTable({ data }: DataTableProps) {
  const [sortColumn, setSortColumn] = useState<'id' | 'listId' | 'name'>('listId'); // Set default sort value to listId
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [filter_text, setText] = useState('');

  // Function to toggle the sort order
  const toggleSort = (column: 'id' | 'listId' | 'name') => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
  };

  // Filter data to exclude items with blank or null names and include search text
  const filteredData = data.filter(item => 
    item.name && 
    item.name.trim() !== '' && 
    item.name.toLowerCase().includes(filter_text.toLowerCase())
  );

  // Sort data based on the selected column and order
  const sortedData = [...filteredData].sort((a, b) => {
    let comparison = 0;
    // Compare by the selected column
    if (a[sortColumn]! > b[sortColumn]!) comparison = 1;
    if (a[sortColumn]! < b[sortColumn]!) comparison = -1;
    // Tie-breaking logic by name
    if (comparison === 0) {
      if (a.name && b.name) {
        if (a.name > b.name) comparison = 1;
        if (a.name < b.name) comparison = -1;
      }
    }
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  return (
    <View>
     <Text style={styles.inputLabel}>Filter by Name:</Text>
      <TextInput
        placeholder="Filter by Name"
        value={filter_text}
        onChangeText={(newText) => setText(newText)}
        style={styles.textInput} // Optional: Add styling to the TextInput
      />
      <View style={styles.table}>
        {/* Table Header */}
        <View style={styles.tableRow}>
          <Text onPress={() => toggleSort('listId')} style={styles.tableHeader}>
            List ID {sortColumn === 'listId' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
          </Text>
          <Text onPress={() => toggleSort('id')} style={styles.tableHeader}>
            ID {sortColumn === 'id' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
          </Text>
          <Text onPress={() => toggleSort('name')} style={styles.tableHeader}>
            Name {sortColumn === 'name' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
          </Text>
        </View>

        {/* Table Rows */}
        {sortedData.map((item) => (
          <View key={item.id} style={styles.tableRow}>
            <Text style={styles.tableCell}>{item.listId}</Text>
            <Text style={styles.tableCell}>{item.id}</Text>
            <Text style={styles.tableCell}>{item.name}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  table: {
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  tableRow: {
    flexDirection: 'row',
    padding: 5,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  tableHeader: {
    flex: 1,
    fontWeight: 'bold',
    padding: 8,
  },
  tableCell: {
    flex: 1,
    padding: 5,
  },
  textInput: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 4,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});
