const characters = [
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
].sort()

Vue.component('character-row', {
  props: {
    character: String,
    selected: Boolean,
    onSelect: Function,
  },
  methods: {
    styles: function () {
      return {
        root: `
          display: inline-block;
          background: ${this.selected ? 'blue' : 'lightgray'};
          color: ${this.selected ? 'white' : 'inherit'};
          padding: 1rem;
          margin: .5rem;
          border-radius: 10px;
        `
      }
    },
    onClick: function () {
      this.onSelect(this.character)
    },
  },
  template: `
    <div v-bind:style="styles().root" v-on:click="onClick">
      {{ character }}
    </div>
  `,
})

const placeholderText = 'Random character shows up here'

const app = new Vue({
  el: '#app',
  data: {
    characters,
    selectedCharacters: JSON.parse(localStorage.getItem('selected_characters')) || [],
    randomCharacter: placeholderText,
  },
  methods: {
    styles: function () {
      return {
        root: `
          display: flex;
          flex-direction: column;
          text-align: center;
          font-family: helvetica-nue, arial, sans-serif;
          height: 100%;
          max-height: 90vh;
        `,
        characterList: `
          flex: 1;
          overflow-y: scroll;
        `,
        randomCharacterContainer: `
          flex: 1;
        `,
        randomCharacter: `
          font-size: 2rem;
          color: ${this.randomCharacter === placeholderText ? 'lightgray' : 'inherit' };
        `,
        randomCharacterButton: `
          padding: .5rem;
          border: none;
          font-size: 1.5rem;
          border-radius: 10px;
          color: white;
          background: gray;
        `,
        buttonContainer: `
          margin-top: 1rem;
        `,
      }
    },
    onSelectCharacter: function (character) {
      let chars = JSON.parse(localStorage.getItem('selected_characters')) || []
      const charIdx = this.selectedCharacters.indexOf(character)
      if (charIdx === -1) {
        chars.push(character)
      } else {
        chars.splice(charIdx, 1)
      }
      localStorage.setItem('selected_characters', JSON.stringify(chars))
      this.selectedCharacters = chars;

    },
    chooseRandomCharacter: function () {
      this.randomCharacter = this.selectedCharacters[Math.floor(Math.random() * this.selectedCharacters.length)];
    },
  },
  template: `
    <div v-bind:style="styles().root">
      <h1>Character List</h1>
      <div v-bind:style="styles().characterList">
        <character-row
          v-for="c in characters"
          v-bind:key="c"
          v-bind:character="c"
          v-bind:selected="selectedCharacters.includes(c)"
          v-bind:onSelect="onSelectCharacter"
          ></character-row>
      </div>
      <div v-bind:style="styles().buttonContainer">
        <div v-bind:style="styles().randomCharacterContainer">
          <h1 v-bind:style="styles().randomCharacter">
            {{ randomCharacter }}
          </h1>
        </div>
        <div>
          <button
            v-bind:style="styles().randomCharacterButton"
            v-on:click="chooseRandomCharacter"
            >
            Random Character
          </button>
        </div>
      </div>
    </div>
  `,
})