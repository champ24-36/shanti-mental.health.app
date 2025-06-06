import React, { useState } from 'react';
import { 
  Play, 
  Pause, 
  Headphones, 
  Book, 
  Video, 
  Heart, 
  Brain,
  Leaf,
  Clock,
  Star,
  Search,
  Filter
} from 'lucide-react';

interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'meditation' | 'breathing' | 'education' | 'exercise';
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  rating: number;
  audioUrl?: string;
  videoUrl?: string;
}

const Resources: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);

  const resources: Resource[] = [
    {
      id: '1',
      title: '5-Minute Mindful Breathing',
      description: 'A guided breathing exercise to help reduce stress and anxiety. Perfect for beginners.',
      type: 'breathing',
      duration: '5 min',
      difficulty: 'Beginner',
      rating: 4.8,
      audioUrl: '#'
    },
    {
      id: '2',
      title: 'Body Scan Meditation',
      description: 'Progressive relaxation technique to release physical tension and promote mental calm.',
      type: 'meditation',
      duration: '15 min',
      difficulty: 'Intermediate',
      rating: 4.9,
      audioUrl: '#'
    },
    {
      id: '3',
      title: 'Understanding Anxiety',
      description: 'Educational content about anxiety disorders, symptoms, and evidence-based treatments.',
      type: 'education',
      duration: '12 min',
      difficulty: 'Beginner',
      rating: 4.7,
      videoUrl: '#'
    },
    {
      id: '4',
      title: 'Morning Energy Boost',
      description: 'Gentle stretching and breathing exercises to start your day with positive energy.',
      type: 'exercise',
      duration: '10 min',
      difficulty: 'Beginner',
      rating: 4.6,
      videoUrl: '#'
    },
    {
      id: '5',
      title: 'Sleep Preparation Meditation',
      description: 'Calming meditation designed to help you transition into restful sleep.',
      type: 'meditation',
      duration: '20 min',
      difficulty: 'Beginner',
      rating: 4.9,
      audioUrl: '#'
    },
    {
      id: '6',
      title: 'Advanced Mindfulness Practice',
      description: 'Deep mindfulness meditation for experienced practitioners.',
      type: 'meditation',
      duration: '30 min',
      difficulty: 'Advanced',
      rating: 4.8,
      audioUrl: '#'
    },
    {
      id: '7',
      title: 'Coping with Depression',
      description: 'Educational video about depression, self-care strategies, and when to seek help.',
      type: 'education',
      duration: '18 min',
      difficulty: 'Intermediate',
      rating: 4.9,
      videoUrl: '#'
    },
    {
      id: '8',
      title: 'Box Breathing Technique',
      description: 'Four-count breathing pattern used by Navy SEALs to manage stress and improve focus.',
      type: 'breathing',
      duration: '8 min',
      difficulty: 'Intermediate',
      rating: 4.7,
      audioUrl: '#'
    }
  ];

  const resourceTypes = [
    { value: 'all', label: 'All Resources', icon: Heart },
    { value: 'meditation', label: 'Meditation', icon: Brain },
    { value: 'breathing', label: 'Breathing', icon: Leaf },
    { value: 'education', label: 'Education', icon: Book },
    { value: 'exercise', label: 'Exercises', icon: Heart }
  ];

  const filteredResources = resources.filter(resource => {
    const matchesType = selectedType === 'all' || resource.type === selectedType;
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      meditation: 'bg-purple-100 text-purple-700',
      breathing: 'bg-green-100 text-green-700',
      education: 'bg-blue-100 text-blue-700',
      exercise: 'bg-orange-100 text-orange-700'
    };
    return colors[type] || 'bg-gray-100 text-gray-700';
  };

  const getDifficultyColor = (difficulty: string) => {
    const colors: Record<string, string> = {
      Beginner: 'text-green-600',
      Intermediate: 'text-yellow-600',
      Advanced: 'text-red-600'
    };
    return colors[difficulty] || 'text-gray-600';
  };

  const handlePlayAudio = (resourceId: string) => {
    if (playingAudio === resourceId) {
      setPlayingAudio(null);
    } else {
      setPlayingAudio(resourceId);
      // Simulate audio playback
      setTimeout(() => setPlayingAudio(null), 5000);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Mental Health Resources</h1>
        <p className="text-gray-600 mt-2">Guided meditations, breathing exercises, and educational content</p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search resources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Resource Type Tabs */}
      <div className="flex flex-wrap gap-2">
        {resourceTypes.map((type) => {
          const Icon = type.icon;
          return (
            <button
              key={type.value}
              onClick={() => setSelectedType(type.value)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                selectedType === type.value
                  ? 'bg-gradient-to-r from-blue-600 to-green-600 text-white'
                  : 'bg-white/80 text-gray-600 hover:bg-blue-50'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{type.label}</span>
            </button>
          );
        })}
      </div>

      {/* Featured Resource */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-3">Today's Featured Resource</h2>
            <h3 className="text-xl font-semibold mb-2">5-Minute Mindful Breathing</h3>
            <p className="text-blue-100 mb-4">
              Start your day with this simple yet powerful breathing exercise. Perfect for reducing morning anxiety and setting a positive tone.
            </p>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => handlePlayAudio('featured')}
                className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors"
              >
                {playingAudio === 'featured' ? (
                  <Pause className="w-5 h-5" />
                ) : (
                  <Play className="w-5 h-5" />
                )}
                <span>Start Session</span>
              </button>
              <div className="flex items-center space-x-1 text-blue-100">
                <Clock className="w-4 h-4" />
                <span>5 minutes</span>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center">
              <Headphones className="w-16 h-16" />
            </div>
          </div>
        </div>
      </div>

      {/* Resources Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((resource) => (
          <div
            key={resource.id}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-blue-100 hover:shadow-xl transition-all duration-200"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-2">
                {resource.audioUrl ? (
                  <Headphones className="w-5 h-5 text-purple-600" />
                ) : (
                  <Video className="w-5 h-5 text-blue-600" />
                )}
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(resource.type)}`}>
                  {resource.type}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="text-sm text-gray-600">{resource.rating}</span>
              </div>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{resource.title}</h3>
            <p className="text-gray-600 text-sm mb-4 leading-relaxed">{resource.description}</p>
            
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{resource.duration}</span>
                </div>
                <span className={`font-medium ${getDifficultyColor(resource.difficulty)}`}>
                  {resource.difficulty}
                </span>
              </div>
            </div>
            
            <button
              onClick={() => handlePlayAudio(resource.id)}
              className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-green-600 text-white font-semibold py-3 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              {playingAudio === resource.id ? (
                <>
                  <Pause className="w-5 h-5" />
                  <span>Playing...</span>
                </>
              ) : (
                <>
                  <Play className="w-5 h-5" />
                  <span>Start</span>
                </>
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Emergency Resources */}
      <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6">
        <h3 className="text-xl font-semibold text-red-800 mb-4">Crisis Support Resources</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2">National Suicide Prevention Lifeline</h4>
            <p className="text-2xl font-bold text-red-600">988</p>
            <p className="text-sm text-gray-600">24/7 crisis support in English and Spanish</p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2">Crisis Text Line</h4>
            <p className="text-lg font-bold text-red-600">Text HOME to 741741</p>
            <p className="text-sm text-gray-600">24/7 support via text message</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;