import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Home, Search, Heart, Calendar, Menu, MapPin, Tag, Clock, ChevronLeft, ChevronRight, Share2, Star, ArrowLeft, Navigation } from 'lucide-react';
import { fetchEventDetail } from '../../services/SearchDetailService';
import { addToFavorite, removeFromFavorite, checkIfFavorited } from '../../services/FavoriteService';

export default function PlaceDetailPage() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorited, setIsFavorited] = useState(false);
  const [isUpdatingFavorite, setIsUpdatingFavorite] = useState(false);

  // Fetch event data on component mount
  useEffect(() => {
    const loadEventDetail = async () => {
      try {
        setLoading(true);
        const data = await fetchEventDetail(eventId);
        setEventData(data);
        
        // Check if already favorited
        const favorited = await checkIfFavorited(eventId);
        setIsFavorited(favorited);
      } catch (err) {
        setError(err.message);
        console.error('Failed to load event:', err);
      } finally {
        setLoading(false);
      }
    };

    if (eventId) {
      loadEventDetail();
    }
  }, [eventId]);

  // Use fetched data or show loading/error state
  const place = eventData ? {
    id: eventData.id,
    name: eventData.title,
    location: eventData.locationSummary,
    address: eventData.address,
    categories: eventData.categories,
    openingHours: `${eventData.startDatetime} - ${eventData.endDatetime}`,
    description: eventData.description,
    images: eventData.images || [],
    price: eventData.price
  } : null;

  const reviews = eventData?.reviews || [];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % place.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + place.images.length) % place.images.length);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: place.name,
        text: place.description,
        url: window.location.href
      });
    } else {
      alert('This feature is not supported by your browser');
    }
  };

  const handleToggleFavorite = async () => {
    try {
      setIsUpdatingFavorite(true);
      if (isFavorited) {
        await removeFromFavorite(eventId);
        setIsFavorited(false);
      } else {
        await addToFavorite(eventId);
        setIsFavorited(true);
      }
    } catch (err) {
      console.error('Error toggling favorite:', err);
      alert('Error updating favorite status');
    } finally {
      setIsUpdatingFavorite(false);
    }
  };

  const openInGoogleMaps = () => {
    const query = encodeURIComponent(place.address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  const handleNavigateHome = () => navigate('/');
  const handleNavigateSearch = () => navigate('/events/search');
  const handleNavigateFavorites = () => navigate('/favorites');
  const handleNavigateEvents = () => navigate('/events/search');

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
      {loading && (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
            <p className="text-gray-600 font-medium">Loading event details...</p>
          </div>
        </div>
      )}

      {error && (
        <div className="flex items-center justify-center min-h-screen">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-600 font-semibold mb-2">Error Loading Event</p>
            <p className="text-red-500">{error}</p>
          </div>
        </div>
      )}

      {place && !loading && !error && (
      <>
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">HW</span>
                </div>
                <span className="text-xl font-bold text-gray-900">Happy Weekend</span>
              </div>
              <span className="text-sm text-gray-500 hidden sm:block">Weekend Adventures</span>
            </div>
            
            <nav className="hidden md:flex items-center gap-6">
              <button 
                onClick={handleNavigateHome}
                className="flex items-center gap-2 text-gray-700 hover:text-red-500 transition-colors"
              >
                <Home size={20} />
                <span>Home</span>
              </button>
              <button 
                onClick={handleNavigateSearch}
                className="flex items-center gap-2 text-gray-700 hover:text-red-500 transition-colors"
              >
                <Search size={20} />
                <span>Search</span>
              </button>
              <button 
                onClick={handleNavigateFavorites}
                className="flex items-center gap-2 text-gray-700 hover:text-red-500 transition-colors"
              >
                <Heart size={20} />
                <span>Favorites</span>
              </button>
              <button 
                onClick={handleNavigateEvents}
                className="flex items-center gap-2 text-gray-700 hover:text-red-500 transition-colors"
              >
                <Calendar size={20} />
                <span>Events</span>
              </button>
            </nav>
            
            <button className="md:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="relative bg-gray-200 rounded-2xl overflow-hidden shadow-lg group">
              <div className="aspect-video w-full">
                <img
                  src={place.images[currentImageIndex]}
                  alt="Place"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {place.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
                  >
                    <ChevronRight size={24} />
                  </button>
                  
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {place.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`h-2 rounded-full transition-all ${
                          index === currentImageIndex ? 'bg-white w-8' : 'bg-white/60 w-2'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Place Info */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{place.name}</h1>
                  <div className="flex items-center gap-2 text-gray-600 mb-3">
                    <MapPin size={18} className="text-red-500" />
                    <span>{place.location}</span>
                  </div>
                </div>
                <button 
                  onClick={handleToggleFavorite}
                  disabled={isUpdatingFavorite}
                  className={`p-3 rounded-full transition-all transform hover:scale-110 ${
                    isFavorited 
                      ? 'bg-red-500 text-white shadow-lg shadow-red-500/50' 
                      : 'bg-white border-2 border-red-200 text-red-500 hover:border-red-400'
                  } disabled:opacity-50`}
                  title={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
                >
                  <Heart size={24} fill={isFavorited ? 'currentColor' : 'none'} />
                </button>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {place.categories.map((category, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-red-50 to-pink-50 text-red-600 rounded-full text-sm font-medium"
                  >
                    <Tag size={14} />
                    {category}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center gap-2 text-gray-600 mb-4 bg-blue-50 p-3 rounded-lg">
                <Clock size={18} className="text-blue-500" />
                <span className="font-medium">{place.openingHours}</span>
              </div>
              
              <p className="text-gray-700 leading-relaxed text-lg">{place.description}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleToggleFavorite}
                disabled={isUpdatingFavorite}
                className={`flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-semibold shadow-lg transition-all transform hover:scale-105 disabled:opacity-50 ${
                  isFavorited 
                    ? 'bg-red-500 hover:bg-red-600 hover:shadow-xl text-white' 
                    : 'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 hover:shadow-xl text-white'
                }`}
              >
                <Heart size={20} fill={isFavorited ? 'currentColor' : 'none'} />
                {isFavorited ? 'Remove from Favorites' : 'Add to Favorites'}
              </button>
              <button
                onClick={handleShare}
                className="flex items-center justify-center gap-2 bg-white border-2 border-gray-300 text-gray-700 py-3.5 px-6 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all shadow-md hover:shadow-lg transform hover:scale-105"
              >
                <Share2 size={20} />
                Share
              </button>
            </div>
          </div>

          {/* Right Column - Map & Reviews */}
          <div className="space-y-6">
            {/* Map Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <MapPin className="text-red-500" />
                Location
              </h2>
              
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-8 mb-4 flex items-center justify-center min-h-[200px] border-2 border-dashed border-blue-200">
                <div className="text-center">
                  <MapPin size={48} className="text-blue-400 mx-auto mb-3" />
                  <p className="text-gray-600 mb-4 font-medium">
                    Map (Embed Google Maps when API is integrated)
                  </p>
                  <button
                    onClick={openInGoogleMaps}
                    className="inline-flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-all shadow-md hover:shadow-lg transform hover:scale-105 font-semibold"
                  >
                    <Navigation size={18} />
                    Open in Google Maps
                  </button>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700 font-medium">{place.address}</p>
              </div>
            </div>

            {/* Review Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Star className="text-yellow-500 fill-yellow-500" />
                Reviews
              </h2>
              
              <div className="space-y-4">
                {reviews.map((review, index) => (
                  <div key={index} className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-5 hover:shadow-md transition-all border border-gray-100">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                        {review.userName.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{review.userName}</h4>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              className={i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-gray-500 font-medium">{review.date}</span>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      </>
      )}
    </div>
  );
}