export const MOVIE_CATEGORIES = [
  {
    id: 'trending',
    title: 'Trending Now',
    movies: [
      { id: 1, title: 'Stranger Things', category: 'Sci-Fi', type: 'series', rating: '98% Match', year: '2016', duration: '4 Seasons', description: 'When a young boy vanishes, a small town uncovers a mystery involving secret experiments.', genres: ['Sci-Fi TV', 'Teen TV Shows', 'Horror'], cast: ['Winona Ryder', 'David Harbour', 'Finn Wolfhard'], trailerUrl: 'https://www.youtube.com/embed/b9EkMc79ZSU' },
      { id: 2, title: 'The Crown', category: 'Drama', type: 'series', rating: '95% Match', year: '2016', duration: '6 Seasons', description: 'This drama follows the political rivalries and romance of Queen Elizabeth II\'s reign.', genres: ['British', 'TV Dramas', 'Period Pieces'], cast: ['Olivia Colman', 'Helena Bonham Carter', 'Tobias Menzies'], trailerUrl: 'https://www.youtube.com/embed/JWtkfkoV969' },
      { id: 3, title: 'Money Heist', category: 'Action', type: 'series', rating: '97% Match', year: '2017', duration: '5 Parts', description: 'Eight thieves take hostages and lock themselves in the Royal Mint of Spain.', genres: ['Spanish', 'TV Thrillers', 'Crime TV Shows'], cast: ['Úrsula Corberó', 'Álvaro Morte', 'Itziar Ituño'], trailerUrl: 'https://www.youtube.com/embed/hMANIarjT50' },
      { id: 4, title: 'Black Mirror', category: 'Sci-Fi', type: 'series', rating: '94% Match', year: '2011', duration: '6 Seasons', description: 'An anthology series exploring a twisted, high-tech multiverse where humanity\'s greatest innovations and darkest instincts collide.', genres: ['British', 'Sci-Fi TV', 'TV Thrillers'], cast: ['Jesse Plemons', 'Daniel Kaluuya', 'Bryce Dallas Howard'], trailerUrl: 'https://www.youtube.com/embed/V0Jz5vX61w8' },
      { id: 5, title: 'The Witcher', category: 'Fantasy', type: 'series', rating: '96% Match', year: '2019', duration: '3 Seasons', description: 'Geralt of Rivia, a mutated monster-hunter for hire, journeys toward his destiny.', genres: ['TV Fantasy', 'TV Action & Adventure', 'TV Dramas'], cast: ['Henry Cavill', 'Anya Chalotra', 'Freya Allan'], trailerUrl: 'https://www.youtube.com/embed/ndl1W4ltcmg' },
      { id: 6, title: 'Ozark', category: 'Crime', type: 'series', rating: '95% Match', year: '2017', duration: '4 Seasons', description: 'A financial adviser drags his family from Chicago to the Missouri Ozarks, where he must launder money.', genres: ['Crime TV Shows', 'TV Dramas', 'TV Thrillers'], cast: ['Jason Bateman', 'Laura Linney', 'Sofia Hublitz'], trailerUrl: 'https://www.youtube.com/embed/5hAXVqrljbs' },
    ]
  },
  {
    id: 'originals',
    title: 'Netflix Originals',
    movies: [
      { id: 7, title: 'Squid Game', category: 'Thriller', type: 'series', rating: '99% Match', year: '2021', duration: '1 Season', description: 'Hundreds of cash-strapped players accept a strange invitation to compete in children\'s games.', genres: ['South Korean', 'TV Thrillers', 'TV Dramas'], cast: ['Lee Jung-jae', 'Park Hae-soo', 'Wi Ha-jun'], trailerUrl: 'https://www.youtube.com/embed/oqxAJKy0ii4' },
      { id: 8, title: 'Bridgerton', category: 'Romance', type: 'series', rating: '92% Match', year: '2020', duration: '2 Seasons', description: 'Wealth, lust, and betrayal set against the backdrop of Regency-era England.', genres: ['TV Dramas', 'TV Shows Based on Books', 'Romantic TV Shows'], cast: ['Adjoa Andoh', 'Julie Andrews', 'Lorraine Ashbourne'], trailerUrl: 'https://www.youtube.com/embed/gpv7ayf_tyE' },
      { id: 9, title: 'The Queen\'s Gambit', category: 'Drama', type: 'series', rating: '98% Match', year: '2020', duration: 'Limited Series', description: 'Orphaned at 9, a chess prodigy struggles with addiction in a quest to become the greatest player.', genres: ['TV Dramas', 'TV Shows Based on Books'], cast: ['Anya Taylor-Joy', 'Bill Camp', 'Marielle Heller'], trailerUrl: 'https://www.youtube.com/embed/CDrieqwSdgI' },
      { id: 10, title: 'Bojack Horseman', category: 'Animation', type: 'series', rating: '93% Match', year: '2014', duration: '6 Seasons', description: 'A humanoid horse, BoJack Horseman, lost in a sea of self-loathing and booze.', genres: ['TV Comedies', 'Adult Animation', 'Sitcoms'], cast: ['Will Arnett', 'Amy Sedaris', 'Alison Brie'], trailerUrl: 'https://www.youtube.com/embed/i1eJPsyMf6A' },
      { id: 11, title: 'Narcos', category: 'Crime', type: 'series', rating: '96% Match', year: '2015', duration: '3 Seasons', description: 'A chronicled look at the criminal exploits of Colombian drug lord Pablo Escobar.', genres: ['Crime TV Shows', 'TV Dramas', 'TV Action & Adventure'], cast: ['Wagner Moura', 'Boyd Holbrook', 'Pedro Pascal'], trailerUrl: 'https://www.youtube.com/embed/xl8zdCY-DX0' },
      { id: 12, title: 'Dark', category: 'Sci-Fi', type: 'series', rating: '97% Match', year: '2017', duration: '3 Seasons', description: 'A family saga with a supernatural twist, set in a German town, where the disappearance of two young children exposes the relationships among four families.', genres: ['German', 'Sci-Fi TV', 'TV Thrillers'], cast: ['Louis Hofmann', 'Oliver Masucci', 'Jördis Triebel'], trailerUrl: 'https://www.youtube.com/embed/rrwycJ08PSA' },
    ]
  },
  {
    id: 'top-rated',
    title: 'Top Rated',
    movies: [
      { id: 13, title: 'Inception', category: 'Sci-Fi', type: 'movie', rating: '99% Match', year: '2010', duration: '2h 28m', description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea.', genres: ['Sci-Fi', 'Action', 'Adventure'], cast: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt', 'Elliot Page'], trailerUrl: 'https://www.youtube.com/embed/YoHD9XEInc0' },
      { id: 14, title: 'The Godfather', category: 'Crime', type: 'movie', rating: '98% Match', year: '1972', duration: '2h 55m', description: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.', genres: ['Crime', 'Drama'], cast: ['Marlon Brando', 'Al Pacino', 'James Caan'], trailerUrl: 'https://www.youtube.com/embed/sY1S34973zA' },
      { id: 15, title: 'Interstellar', category: 'Sci-Fi', type: 'movie', rating: '97% Match', year: '2014', duration: '2h 49m', description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.', genres: ['Sci-Fi', 'Drama', 'Adventure'], cast: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain'], trailerUrl: 'https://www.youtube.com/embed/zSWdZVtXT7E' },
      { id: 16, title: 'Peaky Blinders', category: 'Crime', type: 'series', rating: '97% Match', year: '2013', duration: '6 Seasons', description: 'A gangster family epic set in 1900s England, centering on a gang who sew razor blades in the peaks of their caps.', genres: ['British', 'Crime TV Shows', 'TV Dramas'], cast: ['Cillian Murphy', 'Sam Neill', 'Helen McCrory'], trailerUrl: 'https://www.youtube.com/embed/oVzVdvGIC7U' },
      { id: 17, title: 'The Last Kingdom', category: 'Action', type: 'series', rating: '94% Match', year: '2015', duration: '5 Seasons', description: 'As Alfred the Great defends his kingdom from Norse invaders, Uhtred - born a Saxon but raised by Danes - seeks to claim his ancestral birthright.', genres: ['TV Dramas', 'British', 'TV Action & Adventure'], cast: ['Alexander Dreymon', 'Emily Cox', 'David Dawson'], trailerUrl: 'https://www.youtube.com/embed/WxPApTBa4V8' },
      { id: 18, title: 'Succession', category: 'Drama', type: 'series', rating: '96% Match', year: '2018', duration: '4 Seasons', description: 'The Roy family is known for controlling the biggest media and entertainment company in the world.', genres: ['TV Dramas', 'Business'], cast: ['Brian Cox', 'Jeremy Strong', 'Sarah Snook'], trailerUrl: 'https://www.youtube.com/embed/OzY2IW1UCtg' },
    ]
  }
];

export const FEATURED_MOVIES = [
  {
    id: 'stranger-things',
    title: 'STRANGER THINGS',
    image: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?auto=format&fit=crop&q=80&w=2070',
    description: 'When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.',
    match: '98% Match',
    year: '2016',
    seasons: '4 Seasons',
  },
  {
    id: 'the-witcher',
    title: 'THE WITCHER',
    image: 'https://images.unsplash.com/photo-1514539079130-25950c84af65?auto=format&fit=crop&q=80&w=2069',
    description: 'Geralt of Rivia, a mutated monster-hunter for hire, journeys toward his destiny in a turbulent world where people often prove more wicked than beasts.',
    match: '96% Match',
    year: '2019',
    seasons: '3 Seasons',
  },
  {
    id: 'cyberpunk',
    title: 'CYBERPUNK',
    image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80&w=2070',
    description: 'In a future where memories can be traded as currency, a rogue detective uncovers a conspiracy that threatens to erase the history of humanity itself.',
    match: '94% Match',
    year: '2022',
    seasons: '1 Season',
  }
];

export const GENRES = ['Action', 'Comedy', 'Drama', 'Sci-Fi', 'Horror', 'Romance', 'Thriller', 'Animation', 'Fantasy', 'Crime'];

export const NAV_LINKS = ['Home', 'TV Shows', 'Movies', 'New & Popular', 'My List', 'Browse by Languages'];
