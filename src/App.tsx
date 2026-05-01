/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef, FormEvent } from 'react';
import { Search, Bell, User, Plus, Play, Info, ChevronLeft, ChevronRight, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MOVIE_CATEGORIES, NAV_LINKS, FEATURED_MOVIES, GENRES } from './constants';

interface Movie {
  id: number;
  title: string;
  category: string;
  rating: string;
  year: string;
  duration: string;
  description: string;
  genres?: string[];
  cast?: string[];
  trailerUrl?: string;
}

interface NavbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  currentGenre: string;
  setCurrentGenre: (genre: string) => void;
  user: any;
  onLogout: () => void;
  onLogin: () => void;
  isBrowseOpen: boolean;
  onToggleBrowse: (open: boolean) => void;
}

const Navbar = ({ 
  searchQuery, 
  setSearchQuery, 
  currentGenre, 
  setCurrentGenre, 
  user, 
  onLogout, 
  onLogin,
  isBrowseOpen,
  onToggleBrowse
}: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 z-[60] flex w-full items-center justify-between px-6 py-5 transition-all duration-500 md:px-12 ${isScrolled ? 'bg-black' : 'bg-gradient-to-b from-black/80 to-transparent'}`}>
      <div className="flex items-center gap-10">
        <h1 className="text-3xl font-black tracking-tighter text-[#E50914] cursor-pointer" onClick={() => {
          setCurrentGenre('All');
          setSearchQuery('');
          window.scrollTo({top: 0, behavior: 'smooth'});
        }}>NETFLIX</h1>
        
        {/* Desktop Links */}
        <ul className="hidden items-center gap-5 text-sm font-light text-gray-200 lg:flex">
          <li 
            onClick={() => {
              setCurrentGenre('All');
              setSearchQuery('');
            }}
            className={`cursor-pointer transition hover:text-white ${currentGenre === 'All' ? 'font-medium text-white' : ''}`}
          >
            Home
          </li>
          <li 
            onClick={() => {
              setCurrentGenre('TV Shows');
              setSearchQuery('');
            }}
            className={`cursor-pointer transition hover:text-white ${currentGenre === 'TV Shows' ? 'font-medium text-white' : ''}`}
          >
            TV Shows
          </li>
          <li 
            onClick={() => {
              setCurrentGenre('Movies');
              setSearchQuery('');
            }}
            className={`cursor-pointer transition hover:text-white ${currentGenre === 'Movies' ? 'font-medium text-white' : ''}`}
          >
            Movies
          </li>
          <li className="relative">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onToggleBrowse(!isBrowseOpen);
              }}
              className="flex items-center gap-1 cursor-pointer transition hover:text-white"
            >
              Browse More <span className="text-[10px]">▼</span>
            </button>
          </li>
        </ul>

        {/* Mobile Browse Button */}
        <div className="relative lg:hidden">
          <div 
            className="flex cursor-pointer items-center gap-1 text-sm font-medium text-white" 
            onClick={(e) => {
              e.stopPropagation();
              onToggleBrowse(!isBrowseOpen);
            }}
          >
            Browse
            <span className="text-[10px]">▼</span>
          </div>
        </div>

        {/* Shared Browse Dropdown */}
        <AnimatePresence>
          {isBrowseOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute left-6 top-16 md:left-48 h-auto max-h-[80vh] w-[280px] md:w-[500px] grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-4 bg-black/95 border-t-2 border-[#E50914] p-6 shadow-2xl z-[70] overflow-y-auto rounded-b-md"
            >
              <div className="flex flex-col gap-2">
                <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-2">Navigation</span>
                {NAV_LINKS.map(link => (
                  <span 
                    key={link} 
                    className="hover:underline cursor-pointer text-white/70 hover:text-white text-sm"
                    onClick={() => {
                      if (link === 'Home') setCurrentGenre('All');
                      else if (link === 'TV Shows') setCurrentGenre('TV Shows');
                      else if (link === 'Movies') setCurrentGenre('Movies');
                      else if (link === 'My List') setCurrentGenre('My List');
                      else if (link === 'New & Popular') setCurrentGenre('Trending Now');
                      setSearchQuery('');
                      onToggleBrowse(false);
                    }}
                  >{link}</span>
                ))}
              </div>
              <div className="md:col-span-2 flex flex-col gap-2">
                <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-2">Genres</span>
                <div className="grid grid-cols-2 gap-2">
                  {GENRES.map(genre => (
                    <span 
                      key={genre} 
                      onClick={() => {
                        setCurrentGenre(genre);
                        setSearchQuery('');
                        onToggleBrowse(false);
                      }}
                      className={`hover:underline cursor-pointer text-sm ${currentGenre === genre ? 'text-white font-bold' : 'text-white/70 hover:text-white'}`}
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <div className="flex items-center gap-6 text-white text-sm">
        {user ? (
          <>
            <div className={`flex items-center gap-2 border border-white/40 bg-black/50 px-2 py-1 transition-all duration-300 ${isSearchOpen ? 'w-48 opacity-100' : 'w-10 border-transparent bg-transparent'}`}>
              <Search 
                className="h-5 w-5 cursor-pointer" 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              />
              {isSearchOpen && (
                <input 
                  autoFocus
                  type="text" 
                  placeholder="Titles, people, genres" 
                  className="bg-transparent text-sm outline-none placeholder:text-gray-400"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              )}
            </div>
            <span className="hidden cursor-pointer md:inline">DVD</span>
            <Bell className="h-6 w-6 cursor-pointer" />
            <div className="relative">
              <div 
                className="h-8 w-8 cursor-pointer rounded bg-blue-500 overflow-hidden"
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              >
                <img src={user.avatar} alt="Profile" className="h-full w-full object-cover" />
              </div>
              <AnimatePresence>
                {isProfileMenuOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-4 w-48 bg-black/90 border border-gray-700 py-2 shadow-xl"
                  >
                    <div className="px-4 py-2 hover:bg-white/10 cursor-pointer flex items-center gap-2 border-b border-gray-700 mb-2">
                       <img src={user.avatar} alt="Avatar" className="w-8 h-8 rounded" />
                       <span className="font-bold">{user.name}</span>
                    </div>
                    <div className="px-4 py-2 hover:bg-white/10 cursor-pointer">Account</div>
                    <div className="px-4 py-2 hover:bg-white/10 cursor-pointer">Help Centre</div>
                    <div 
                      className="px-4 py-2 hover:bg-white/10 cursor-pointer border-t border-gray-700 mt-2 text-center font-bold"
                      onClick={onLogout}
                    >
                      Sign out of Netflix
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <span className="hidden cursor-pointer text-[10px] md:inline">▼</span>
          </>
        ) : (
          <button 
            onClick={onLogin}
            className="rounded bg-[#E50914] px-4 py-1.5 font-bold transition hover:bg-[#b20710]"
          >
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
};

interface MovieModalProps {
  movie: Movie | null;
  onClose: () => void;
  onWatchlistToggle: (movie: Movie) => void;
  isInWatchlist: boolean;
}

const MovieModal = ({ movie, onClose, onWatchlistToggle, isInWatchlist }: MovieModalProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  
  if (!movie) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm" onClick={() => {
        setIsPlaying(false);
        onClose();
    }}>
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-lg bg-[#181818] text-white no-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={() => {
              setIsPlaying(false);
              onClose();
          }}
          className="absolute right-4 top-4 z-[110] flex h-10 w-10 items-center justify-center rounded-full bg-[#181818] text-white transition hover:bg-white/10 shadow-lg"
        >
          <Plus className="h-6 w-6 rotate-45" />
        </button>

        <div className="relative aspect-video w-full overflow-hidden">
          {isPlaying && movie.trailerUrl ? (
            <iframe 
              src={`${movie.trailerUrl}?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1`}
              className="h-full w-full"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="Trailer"
            />
          ) : (
            <>
              <img 
                src={`https://picsum.photos/seed/${movie.id}/1200/675`} 
                alt={movie.title} 
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent" />
              <div className="absolute bottom-12 left-12 flex flex-col gap-6">
                <h1 className="text-4xl font-black uppercase md:text-6xl drop-shadow-lg">{movie.title}</h1>
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setIsPlaying(true)}
                    className="flex items-center gap-2 rounded bg-white px-8 py-2 text-lg font-bold text-black transition hover:bg-gray-200"
                  >
                    <Play className="h-6 w-6 fill-black" />
                    Play
                  </button>
                  <button 
                    onClick={() => onWatchlistToggle(movie)}
                    className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-gray-500 bg-black/40 text-white transition hover:border-white"
                  >
                    {isInWatchlist ? <Plus className="h-6 w-6 rotate-45" /> : <Plus className="h-6 w-6" />}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="grid grid-cols-1 gap-12 p-8 md:p-12 md:grid-cols-3">
          <div className="col-span-2 flex flex-col gap-6">
            <div className="flex items-center gap-3 text-lg font-semibold">
              <span className="text-green-500">{movie.rating}</span>
              <span className="text-gray-400">{movie.year}</span>
              <span className="border border-gray-500 px-1 text-xs">18+</span>
              <span className="text-gray-400">{movie.duration}</span>
              <span className="rounded border border-gray-500 px-1 text-xs">HD</span>
            </div>
            <p className="text-lg leading-relaxed">{movie.description}</p>
          </div>
          <div className="flex flex-col gap-4 text-sm">
            <div>
              <span className="text-gray-500">Cast: </span>
              {movie.cast?.join(', ')}
            </div>
            <div>
              <span className="text-gray-500">Genres: </span>
              {movie.genres?.join(', ')}
            </div>
            <div>
              <span className="text-gray-500">This show is: </span>
              Gritty, Exciting, Suspenseful
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Banner = ({ onMoreInfo }: { onMoreInfo: (movie: any) => void }) => {
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentMovieIndex((prev) => (prev + 1) % FEATURED_MOVIES.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const movie = FEATURED_MOVIES[currentMovieIndex];

  return (
    <div className="relative h-[550px] w-full overflow-hidden md:h-[650px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={movie.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-[10000ms] scale-110 motion-safe:animate-ken-burns" 
            style={{ backgroundImage: `linear-gradient(to right, #141414 10%, rgba(20,20,20,0.4) 40%, rgba(20,20,20,0) 80%), url('${movie.image}')` }}
          />
        </motion.div>
      </AnimatePresence>
      
      <div className="absolute bottom-0 h-32 w-full bg-gradient-to-t from-[#141414] to-transparent z-20" />

      <div className="absolute top-0 z-30 flex h-full max-w-2xl flex-col justify-center gap-4 px-6 pt-20 md:px-12">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          key={`${movie.id}-info`}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col gap-4"
        >
          <div className="flex items-center gap-2">
             <div className="rounded-sm bg-[#E50914] px-1 py-0.5 text-[10px] font-bold text-white uppercase">SERIES</div>
          </div>
          <h1 className="text-5xl font-extrabold leading-none tracking-tight text-white uppercase md:text-7xl drop-shadow-2xl">
            {movie.title}
          </h1>
          <div className="flex items-center gap-3 text-lg font-semibold text-white drop-shadow-md">
            <span className="text-green-500">{movie.match}</span>
            <span className="border border-gray-500 px-1 text-xs">18+</span>
            <span>{movie.seasons}</span>
            <span className="rounded border border-gray-500 px-1 text-xs">Ultra HD 4K</span>
          </div>
          <p className="line-clamp-3 text-lg leading-snug text-gray-200 drop-shadow-lg max-w-lg">
            {movie.description}
          </p>
          <div className="flex items-center gap-3 pt-2">
            <button className="flex items-center gap-2 rounded bg-white px-8 py-2 text-lg font-bold text-black transition hover:bg-white/80">
              <Play className="h-6 w-6 fill-black" />
              Play
            </button>
            <button className="flex items-center gap-2 rounded bg-gray-500/50 px-8 py-2 text-lg font-bold text-white transition hover:bg-gray-500/30">
              <Info className="h-6 w-6" />
              More Info
            </button>
          </div>
        </motion.div>
      </div>

      <div className="absolute right-0 bottom-32 z-30 flex items-center pr-12">
        <button 
          onClick={() => setIsMuted(!isMuted)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-400 text-white transition hover:bg-white/10"
        >
          {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
        </button>
      </div>
    </div>
  );
};

interface MovieCardProps {
  key?: number;
  movie: Movie;
  onMoreInfo: (movie: Movie) => void;
  onWatchlistToggle: (movie: Movie) => void;
  isInWatchlist: boolean;
}

const MovieCard = ({ movie, onMoreInfo, onWatchlistToggle, isInWatchlist }: MovieCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative h-[105px] w-[185px] shrink-0 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        layout
        className={`absolute top-0 left-0 z-10 w-full overflow-hidden rounded-sm transition-all duration-300 ${isHovered ? 'scale-125 z-50 bg-[#181818] shadow-2xl translate-y-[-20%]' : 'scale-100 z-10 bg-[#2f2f2f]'}`}
      >
        <div className="relative aspect-video" onClick={() => onMoreInfo(movie)}>
          <img
            src={`https://picsum.photos/seed/${movie.id}/400/225`}
            alt={movie.title}
            className="h-full w-full object-cover"
            referrerPolicy="no-referrer"
          />
          {!isHovered && (
            <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/80 to-transparent p-2">
               <span className="line-clamp-1 text-xs font-bold text-white">{movie.title}</span>
            </div>
          )}
        </div>

        {isHovered && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-3 p-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-white p-1.5 transition hover:bg-gray-200">
                  <Play className="h-3 w-3 fill-black text-black" />
                </div>
                <div 
                  onClick={(e) => {
                    e.stopPropagation();
                    onWatchlistToggle(movie);
                  }}
                  className={`rounded-full border border-gray-500 p-1.5 text-white transition hover:border-white ${isInWatchlist ? 'bg-white text-black' : ''}`}
                >
                  {isInWatchlist ? <Plus className="h-3 w-3 rotate-45" /> : <Plus className="h-3 w-3" />}
                </div>
              </div>
              <div 
                onClick={(e) => {
                  e.stopPropagation();
                  onMoreInfo(movie);
                }}
                className="rounded-full border border-gray-500 p-1.5 text-white transition hover:border-white"
              >
                <ChevronRight className="h-3 w-3 rotate-90" />
              </div>
            </div>
            
            <div className="flex flex-col gap-1 text-left">
              <div className="flex items-center gap-2 text-[10px] font-bold">
                <span className="text-green-500">{movie.rating}</span>
                <span className="border border-white/40 px-1 py-0.5 text-white">{movie.year}</span>
                <span className="text-white">{movie.duration}</span>
              </div>
              <p className="line-clamp-2 text-[10px] leading-tight text-white opacity-80">
                {movie.description}
              </p>
              <div className="flex flex-wrap gap-1 pt-1">
                <span className="text-[8px] text-gray-400">{movie.category}</span>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

interface MovieRowProps {
  key?: string;
  title: string;
  movies: Movie[];
  onMoreInfo: (movie: Movie) => void;
  onWatchlistToggle: (movie: Movie) => void;
  watchlist: Movie[];
}

const MovieRow = ({ title, movies, onMoreInfo, onWatchlistToggle, watchlist }: MovieRowProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  if (movies.length === 0) return null;

  return (
    <div className="group/row z-30 flex flex-col gap-4 px-6 md:px-12">
      <h2 className="text-xl font-semibold text-white transition-colors hover:text-gray-200">{title}</h2>
      <div className="relative">
        <button 
          onClick={() => scroll('left')}
          className="absolute left-0 top-0 z-40 flex h-[105px] w-10 items-center justify-center bg-black/50 text-white opacity-0 transition-opacity hover:bg-black/70 group-hover/row:opacity-100 md:w-16"
        >
          <ChevronLeft className="h-8 w-8" />
        </button>
        
        <div 
          ref={scrollRef}
          className="flex gap-2 overflow-x-auto pb-12 no-scrollbar scroll-smooth"
        >
          {movies.map((movie) => (
            <MovieCard 
              key={movie.id} 
              movie={movie} 
              onMoreInfo={onMoreInfo} 
              onWatchlistToggle={onWatchlistToggle} 
              isInWatchlist={watchlist.some(m => m.id === movie.id)}
            />
          ))}
        </div>

        <button 
          onClick={() => scroll('right')}
          className="absolute right-0 top-0 z-40 flex h-[105px] w-10 items-center justify-center bg-black/50 text-white opacity-0 transition-opacity hover:bg-black/70 group-hover/row:opacity-100 md:w-16"
        >
          <ChevronRight className="h-8 w-8" />
        </button>
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="mt-20 flex flex-col gap-8 px-6 pb-20 text-xs text-gray-500 md:px-48 md:text-sm">
      <div className="flex gap-6">
        <button className="transition hover:text-gray-300">Facebook</button>
        <button className="transition hover:text-gray-300">Instagram</button>
        <button className="transition hover:text-gray-300">Twitter</button>
        <button className="transition hover:text-gray-300">YouTube</button>
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 md:grid-cols-4">
        {['Audio Description', 'Help Centre', 'Gift Cards', 'Media Centre', 'Investor Relations', 'Jobs', 'Terms of Use', 'Privacy', 'Legal Notices', 'Cookie Preferences', 'Corporate Information', 'Contact Us'].map(link => (
          <span key={link} className="cursor-pointer hover:underline">{link}</span>
        ))}
      </div>
      <div className="mt-4 flex flex-col gap-4">
        <button className="w-fit border border-gray-500 px-2 py-1 text-xs">Service Code</button>
        <p>© 1997-2026 Netflix Clone, Inc.</p>
      </div>
    </footer>
  );
};

const LoginPage = ({ onLogin }: { onLogin: (email: string) => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter a valid email and password.');
      return;
    }
    onLogin(email);
  };

  return (
    <div className="relative min-h-screen w-full bg-cover bg-center overflow-hidden" style={{ backgroundImage: `url('https://assets.nflxext.com/ffe/siteui/vlv3/f841fd03-df2d-4ee0-9746-c3ef0cb4a481/layers/IN-en-20250210-TRIFECTA-perspective_7335d2d1-2136-4e59-86a0-e6992d9f783c_large.jpg')` }}>
      <div className="absolute inset-0 bg-black/50" />
      
      <nav className="relative z-20 px-12 py-6">
        <h1 className="text-3xl font-black tracking-tighter text-[#E50914] md:text-5xl">NETFLIX</h1>
      </nav>

      <div className="relative z-20 flex items-center justify-center pt-20 pb-20">
        <div className="w-full max-w-md rounded-md bg-black/75 p-8 md:p-16">
          <h2 className="mb-8 text-3xl font-bold text-white">Sign In</h2>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {error && <div className="rounded bg-[#E87C03] p-3 text-sm text-white">{error}</div>}
            
            <div className="relative">
              <input 
                type="email" 
                placeholder="Email or phone number" 
                className="w-full rounded bg-[#333] px-5 py-4 text-white outline-none focus:bg-[#454545]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div className="relative">
              <input 
                type="password" 
                placeholder="Password" 
                className="w-full rounded bg-[#333] px-5 py-4 text-white outline-none focus:bg-[#454545]"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="mt-6 rounded bg-[#E50914] py-3 text-lg font-bold text-white transition hover:bg-[#b20710]">
              Sign In
            </button>

            <div className="mt-4 flex items-center justify-between text-xs text-[#b3b3b3]">
              <div className="flex items-center gap-2">
                <input type="checkbox" className="h-4 w-4" defaultChecked />
                <span>Remember me</span>
              </div>
              <span className="cursor-pointer hover:underline">Need help?</span>
            </div>
          </form>

          <div className="mt-16 text-[#737373]">
            <p>New to Netflix? <span className="cursor-pointer text-white hover:underline">Sign up now.</span></p>
            <p className="mt-4 text-xs">
              This page is protected by Google reCAPTCHA to ensure you're not a bot. <span className="text-[#0071eb] cursor-pointer hover:underline">Learn more.</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentGenre, setCurrentGenre] = useState('All');
  const [user, setUser] = useState<any>(null);
  const [watchlist, setWatchlist] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isBrowseOpen, setIsBrowseOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsBrowseOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogin = (email: string) => {
    setUser({
      name: email.split('@')[0],
      avatar: 'https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-8833v7jbd4nu3689.jpg'
    });
  };

  const handleLogout = () => {
    setUser(null);
    setWatchlist([]);
    setCurrentGenre('All');
    setSearchQuery('');
    setIsBrowseOpen(false);
  };

  const toggleWatchlist = (movie: Movie) => {
    setWatchlist(prev => 
      prev.some(m => m.id === movie.id) 
        ? prev.filter(m => m.id !== movie.id)
        : [...prev, movie]
    );
  };

  const filteredCategories = MOVIE_CATEGORIES.map(category => ({
    ...category,
    movies: category.movies.filter(movie => {
      const matchesSearch = 
        movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.year.includes(searchQuery) ||
        movie.rating.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.genres?.some(g => g.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesGenre = currentGenre === 'All' || 
        (currentGenre === 'TV Shows' && movie.type === 'series') ||
        (currentGenre === 'Movies' && movie.type === 'movie') ||
        (currentGenre === 'My List' && watchlist.some(m => m.id === movie.id)) ||
        (currentGenre === 'Trending Now' && category.title === 'Trending Now') ||
        movie.category === currentGenre || 
        movie.genres?.includes(currentGenre);

      return matchesSearch && matchesGenre;
    })
  })).filter(category => category.movies.length > 0);

  return (
    <div className="relative min-h-screen w-full bg-[#141414] font-sans selection:bg-[#E50914] selection:text-white">
      {!user ? (
        <LoginPage onLogin={handleLogin} />
      ) : (
        <>
          <div ref={navRef}>
            <Navbar 
              searchQuery={searchQuery} 
              setSearchQuery={setSearchQuery} 
              currentGenre={currentGenre}
              setCurrentGenre={setCurrentGenre}
              user={user}
              onLogin={() => {}} // User is already logged in
              onLogout={handleLogout}
              isBrowseOpen={isBrowseOpen}
              onToggleBrowse={setIsBrowseOpen}
            />
          </div>
          
          <main className="relative flex flex-col gap-8">
            {!searchQuery && currentGenre === 'All' && (
              <Banner 
                onMoreInfo={(featuredMovie) => {
                  const fullMovie = MOVIE_CATEGORIES.flatMap(c => c.movies).find(m => m.title.toUpperCase() === featuredMovie.title);
                  if (fullMovie) setSelectedMovie(fullMovie);
                }} 
              />
            )}

            <div className={`${(searchQuery || currentGenre !== 'All') ? 'pt-32' : '-mt-16'} relative z-10 flex flex-col gap-12 pb-20`}>
               {(searchQuery || currentGenre !== 'All') && (
                 <div className="px-6 md:px-12 flex flex-col gap-2">
                    <div className="flex items-center gap-4">
                      <h1 className="text-3xl font-bold text-white">
                        {currentGenre !== 'All' ? currentGenre : 'Search Results'}
                      </h1>
                      {searchQuery && (
                        <span className="text-gray-500 mt-2">Results for "{searchQuery}"</span>
                      )}
                    </div>
                    <button 
                      onClick={() => {
                        setSearchQuery('');
                        setCurrentGenre('All');
                      }}
                      className="w-fit text-sm text-gray-400 hover:text-white transition"
                    >
                      Clear filters
                    </button>
                 </div>
               )}

              {(searchQuery || currentGenre !== 'All') && filteredCategories.length === 0 ? (
                <div className="flex h-[50vh] w-full flex-col items-center justify-center gap-4 text-white">
                  <span className="text-xl opacity-50">No results found for your filters</span>
                </div>
              ) : (
                <>
                  {!searchQuery && currentGenre === 'All' && watchlist.length > 0 && (
                    <MovieRow 
                      title="My List" 
                      movies={watchlist} 
                      onMoreInfo={setSelectedMovie} 
                      onWatchlistToggle={toggleWatchlist}
                      watchlist={watchlist}
                    />
                  )}
                  {filteredCategories.map((category) => (
                    <MovieRow 
                      key={category.id} 
                      title={category.title} 
                      movies={category.movies} 
                      onMoreInfo={setSelectedMovie}
                      onWatchlistToggle={toggleWatchlist}
                      watchlist={watchlist}
                    />
                  ))}
                </>
              )}
            </div>
          </main>
        </>
      )}

      <Footer />
      
      <MovieModal 
        movie={selectedMovie} 
        onClose={() => setSelectedMovie(null)} 
        onWatchlistToggle={toggleWatchlist}
        isInWatchlist={watchlist.some(m => m.id === selectedMovie?.id)}
      />

      <div className="pointer-events-none fixed bottom-0 h-8 w-full bg-gradient-to-t from-black to-transparent z-50"></div>
    </div>
  );
}
