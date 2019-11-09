const characters = [...new Set([
  'Donkey Kong',
  'Samus',
  'Yoshi',
  'Fox',
  'Luigi',
  'Captain Falcon',
  'Peach',
  'Bowser',
  'Sheik',
  'Dr. Mario',
  'Falco',
  'Lucina',
  'Ganondorf',
  'Roy',
  'Mr. Game and Watch',
  'Pit',
  'Zero Suit Samus',
  'Snake',
  'Pokémon Trainer',
  'Lucas',
  'King Dedede',
  'Lucario',
  'Toon Link',
  'Villager',
  'Wii Fit Trainer',
  'Little Mac',
  'Mii Fighter',
  'PAC-MAN',
  'Shulk',
  'Duck Hunt',
  'Ken',
  'Corrin',
  'Inkling',
  'Simon',
  'King K. Rool',
  'Incineroar',
  'Joker',
  'Banjo and Kazooie',
  'Mario',
  'Link',
  'Dark Samus',
  'Kirby',
  'Pikachu',
  'Ness',
  'Jigglypuff',
  'Daisy',
  'Ice Climbers',
  'Zelda',
  'Pichu',
  'Marth',
  'Young Link',
  'Mewtwo',
  'Chrom',
  'Meta Knight',
  'Dark Pit',
  'Wario',
  'Ike',
  'Diddy Kong',
  'Sonic',
  'Olimar',
  'R.O.B.',
  'Wolf',
  'Mega Man',
  'Rosalina',
  'Greninja',
  'Palutena',
  'Robin',
  'Bowser Jr.',
  'Ryu',
  'Cloud',
  'Bayonetta',
  'Ridley',
  'Richter',
  'Isabelle',
  'Piranha Plant',
  'Hero',
  'Terry Bogard',
  'sans'
])].sort()

Vue.component('character-row', {
  props: {
    character: {
      type: 'string',
    },
    selected: {
      type: 'bool',
    },
  },
  methods: {
    styles: function () {
      return {
        root: `
          display: inline-block;
          background: lightgray;
          padding: .5rem;
          margin: .5rem;
          border-radius: 10px;
        `
      }
    },
  },
  template: `
    <div v-bind:style="styles().root">
      {{ character }}
    </div>
  `,
})

const app = new Vue({
  el: '#app',
  data: {
    characters,
  },
  methods: {
    styles: function () {
      return {
        root: `
          font-family: helvetica-nue, arial, sans-serif;
        `,
      }
    },
    isSelected: function (character) {
      const selChars = localStorage.getItem('selected_characters') || []
      return selChars.includes(character)
    },
    onSelectCharacter: function (character) {
      let chars = localStorage.getItem('selected_characters')
      if (this.isSelected(character)) {
        chars.splice(charIdx, 1)
      } else {
        chars.push(character)
      }
      localStorage.setItem('selected_characters', chars)
    },
  },
  template: `
    <div v-bind:style="styles().root">
      <character-row
        v-for="c in characters"
        key="c"
        v-bind:character="c"
        v-bind:selected="isSelected(c)"
        v-on:selectCharacter="onSelectCharacter"
        ></character-row>
    </div>
  `,
})