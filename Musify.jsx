import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, Search, Music } from "lucide-react";
import { motion } from "framer-motion";

const songsData = [
  {
    id: 1,
    title: "Blinding Lights",
    artist: "The Weeknd",
    genre: "Pop",
    cover: "https://i.scdn.co/image/ab67616d0000b273a9a1b2e58f9f0f9f7c7d9c4f",
  },
  {
    id: 2,
    title: "Kesariya",
    artist: "Arijit Singh",
    genre: "Bollywood",
    cover: "https://i.scdn.co/image/ab67616d0000b273a7d3f35fdd6b34e3b3b6a7e1",
  },
  {
    id: 3,
    title: "Believer",
    artist: "Imagine Dragons",
    genre: "Rock",
    cover: "https://i.scdn.co/image/ab67616d0000b273b1a4aee7c7f1f5d4c6b5f6e3",
  },
  {
    id: 4,
    title: "Tum Hi Ho",
    artist: "Arijit Singh",
    genre: "Romantic",
    cover: "https://i.scdn.co/image/ab67616d0000b2739eaa9b2c3b0c1c8d8e7f9d1e",
  },
  {
    id: 5,
    title: "Enemy",
    artist: "Imagine Dragons",
    genre: "Hip Hop",
    cover: "https://i.scdn.co/image/ab67616d0000b273c2f7d5a8b7c8a9b6e7d8c9f0",
  },
];

// ---------------- MAIN COMPONENT ----------------
export default function MusifyApp() {
  const [search, setSearch] = useState("");
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const filteredSongs = songsData.filter(
    (song) =>
      song.title.toLowerCase().includes(search.toLowerCase()) ||
      song.artist.toLowerCase().includes(search.toLowerCase()) ||
      song.genre.toLowerCase().includes(search.toLowerCase())
  );

  const playSong = (song) => {
    setCurrentSong(song);
    setIsPlaying(true);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black text-white p-6">
      {/* HEADER */}
      <header className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2 text-2xl font-bold">
          <Music className="text-green-500" /> Musify
        </div>
        <div className="flex items-center bg-zinc-800 rounded-xl px-3 py-2 w-72">
          <Search className="text-zinc-400 mr-2" size={18} />
          <input
            type="text"
            placeholder="Search songs, artists..."
            className="bg-transparent outline-none text-sm w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </header>

      {/* SONG GRID */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredSongs.map((song) => (
          <motion.div
            key={song.id}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <Card className="bg-zinc-900 border-zinc-800 rounded-2xl shadow-lg">
              <CardContent className="p-4">
                <img
                  src={song.cover}
                  alt={song.title}
                  className="rounded-xl mb-4 w-full h-44 object-cover"
                />
                <h3 className="font-semibold text-lg truncate">{song.title}</h3>
                <p className="text-sm text-zinc-400">{song.artist}</p>
                <p className="text-xs text-zinc-500 mb-3">{song.genre}</p>
                <Button
                  className="w-full bg-green-500 hover:bg-green-600 text-black rounded-xl"
                  onClick={() => playSong(song)}
                >
                  Play
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </section>

      {/* PLAYER BAR */}
      {currentSong && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[90%] md:w-[70%] bg-zinc-900 border border-zinc-800 rounded-2xl p-4 flex items-center justify-between shadow-xl"
        >
          <div className="flex items-center gap-4">
            <img
              src={currentSong.cover}
              alt="cover"
              className="w-14 h-14 rounded-xl"
            />
            <div>
              <h4 className="font-semibold">{currentSong.title}</h4>
              <p className="text-xs text-zinc-400">{currentSong.artist}</p>
            </div>
          </div>
          <Button
            size="icon"
            className="bg-green-500 hover:bg-green-600 text-black rounded-full"
            onClick={togglePlay}
          >
            {isPlaying ? <Pause /> : <Play />}
          </Button>
        </motion.div>
      )}
    </div>
  );
}
