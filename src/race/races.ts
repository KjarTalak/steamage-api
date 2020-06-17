import Race from './race';

import human from './human.json';
import elf from './elf.json';
import desertelf from './desertelf.json';
import chimera from './chimera.json';
import dwarf from './dwarf.json';

const races: Map<string, Race> = new Map();

races.set(human.id, human);
races.set(elf.id, elf);
races.set(desertelf.id, desertelf);
races.set(chimera.id, chimera);
races.set(dwarf.id, dwarf);

export default races;