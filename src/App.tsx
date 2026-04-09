import { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { 
  Phone, 
  Clock, 
  ChefHat, 
  Coffee, 
  Flame, 
  CupSoda, 
  GlassWater, 
  Wine, 
  Egg, 
  Plus, 
  Soup, 
  Utensils,
  Pizza,
  Sandwich,
  MessageCircle,
  ExternalLink,
  Copy,
  Check,
  ShoppingCart,
  Minus,
  Trash2,
  Send
} from 'lucide-react';
import { menuData, restaurantInfo, type MenuItem } from './data/menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Toaster, toast } from 'sonner';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

interface CartItem extends MenuItem {
  quantity: number;
}

const iconMap: Record<string, React.ElementType> = {
  Pizza,
  Sandwich,
  Flame,
  Coffee,
  CupSoda,
  GlassWater,
  Wine,
  Egg,
  Plus,
  Soup,
  Utensils,
};

function App() {
  const [activeCategory, setActiveCategory] = useState<string>(menuData[0].id);
  const [showQRDialog, setShowQRDialog] = useState(false);
  const [showBookingDialog, setShowBookingDialog] = useState(false);
  const [copied, setCopied] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => 
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    toast.success(`${item.name} ajouté au panier`);
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => prev.filter(i => i.id !== itemId));
    toast.info('Article retiré du panier');
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === itemId) {
        const newQuantity = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const clearCart = () => {
    setCart([]);
    toast.info('Panier vidé');
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleWhatsAppClick = () => {
    if (cart.length === 0) {
      const message = encodeURIComponent(`Bonjour, je souhaite faire une réservation chez ${restaurantInfo.name}`);
      const whatsappUrl = `https://wa.me/${restaurantInfo.whatsappNumber.replace('+', '')}?text=${message}`;
      window.open(whatsappUrl, '_blank');
      return;
    }

    const orderDetails = cart.map(item => 
      `- ${item.name} x${item.quantity} = ${item.price * item.quantity} dh`
    ).join('\n');

    const message = encodeURIComponent(
      `Bonjour ${restaurantInfo.name},\n\n` +
      `Je souhaite commander :\n\n` +
      `${orderDetails}\n\n` +
      `*Total: ${cartTotal} dh*\n\n` +
      `Merci !`
    );

    const whatsappUrl = `https://wa.me/${restaurantInfo.whatsappNumber.replace('+', '')}?text=${message}`;
    window.open(whatsappUrl, '_blank');
    setShowBookingDialog(false);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    toast.success('Lien copié !');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-rose-50 to-amber-50">
      <Toaster position="top-center" richColors />
      
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-orange-100 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-rose-500 rounded-full flex items-center justify-center shadow-lg">
              <ChefHat className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-rose-600 bg-clip-text text-transparent">
                {restaurantInfo.name}
              </h1>
              <p className="text-xs text-gray-500">{restaurantInfo.tagline}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  className="relative border-orange-200 hover:bg-orange-50"
                  size="sm"
                >
                  <ShoppingCart className="w-4 h-4" />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-2 -right-2 w-5 h-5 bg-gradient-to-r from-orange-500 to-rose-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                      {cartItemCount}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-md flex flex-col">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5" />
                    Votre Panier
                  </SheetTitle>
                </SheetHeader>
                <div className="flex-1 overflow-auto py-4">
                  {cart.length === 0 ? (
                    <div className="text-center py-12 text-gray-400">
                      <ShoppingCart className="w-16 h-16 mx-auto mb-4 opacity-30" />
                      <p>Votre panier est vide</p>
                      <p className="text-sm mt-1">Ajoutez des articles pour commander</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {cart.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"
                        >
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-800">{item.name}</h4>
                            <p className="text-sm text-orange-600 font-semibold">
                              {item.price} dh
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-8 text-center font-semibold">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="w-8 h-8 rounded-full bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-100 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {cart.length > 0 && (
                  <div className="border-t pt-4 space-y-4">
                    <div className="flex items-center justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-orange-600">{cartTotal} dh</span>
                    </div>
                    <div className="space-y-2">
                      <Button
                        onClick={() => {
                          setIsCartOpen(false);
                          setShowBookingDialog(true);
                        }}
                        className="w-full bg-green-500 hover:bg-green-600 text-white gap-2"
                        size="lg"
                      >
                        <Send className="w-5 h-5" />
                        Commander sur WhatsApp
                      </Button>
                      <Button
                        variant="outline"
                        onClick={clearCart}
                        className="w-full text-red-500 border-red-200 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Vider le panier
                      </Button>
                    </div>
                  </div>
                )}
              </SheetContent>
            </Sheet>
            <Button
              onClick={() => setShowBookingDialog(true)}
              className="bg-green-500 hover:bg-green-600 text-white gap-2"
              size="sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Réserver</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section with QR */}
      <section className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-orange-400 via-rose-400 to-amber-400 p-8 text-white text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Menu Digital</h2>
              <p className="text-white/90">Scannez pour voir notre menu</p>
            </div>
            <div className="p-8 flex flex-col md:flex-row items-center justify-center gap-8">
              <div className="bg-white p-4 rounded-2xl shadow-lg border-2 border-orange-100">
                <QRCodeSVG 
                  value={currentUrl || 'https://espacedelice.menu'}
                  size={180}
                  level="H"
                  includeMargin={false}
                  bgColor="#ffffff"
                  fgColor="#ea580c"
                />
              </div>
              <div className="text-center md:text-left space-y-4">
                <p className="text-gray-600">Partagez ce menu avec vos clients</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    variant="outline" 
                    onClick={() => setShowQRDialog(true)}
                    className="border-orange-200 hover:bg-orange-50"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Voir QR Code
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={handleCopyLink}
                    className="border-orange-200 hover:bg-orange-50"
                  >
                    {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                    {copied ? 'Copié !' : 'Copier le lien'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Categories */}
      <section className="py-4 px-4">
        <div className="max-w-4xl mx-auto">
          <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
            <ScrollArea className="w-full whitespace-nowrap">
              <TabsList className="bg-white/50 backdrop-blur-sm p-1 inline-flex h-auto flex-wrap gap-1">
                {menuData.map((category) => {
                  const IconComponent = iconMap[category.icon] || Utensils;
                  return (
                    <TabsTrigger
                      key={category.id}
                      value={category.id}
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-rose-500 data-[state=active]:text-white px-4 py-2 rounded-full flex items-center gap-2"
                    >
                      <IconComponent className="w-4 h-4" />
                      <span className="hidden sm:inline">{category.name}</span>
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </ScrollArea>

            {menuData.map((category) => (
              <TabsContent key={category.id} value={category.id} className="mt-6">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-orange-100 to-rose-100 px-6 py-4 flex items-center gap-3">
                    {(() => {
                      const IconComponent = iconMap[category.icon] || Utensils;
                      return <IconComponent className="w-6 h-6 text-orange-600" />;
                    })()}
                    <h3 className="text-xl font-bold text-gray-800">{category.name}</h3>
                  </div>
                  <div className="p-6">
                    <div className="grid gap-3">
                      {category.items.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-orange-50 transition-colors group"
                        >
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-800 group-hover:text-orange-700 transition-colors">
                              {item.name}
                            </h4>
                            {item.description && (
                              <p className="text-sm text-gray-500">{item.description}</p>
                            )}
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge 
                              variant="secondary" 
                              className="bg-gradient-to-r from-orange-400 to-rose-400 text-white font-bold px-4 py-1"
                            >
                              {item.price} dh
                            </Badge>
                            <Button
                              size="sm"
                              onClick={() => addToCart(item)}
                              className="bg-green-500 hover:bg-green-600 text-white"
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* WhatsApp Floating Button */}
      <button
        onClick={() => setShowBookingDialog(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center z-40"
      >
        <MessageCircle className="w-7 h-7" />
      </button>

      {/* Cart Floating Button (Mobile) */}
      <button
        onClick={() => setIsCartOpen(true)}
        className="fixed bottom-6 left-6 w-14 h-14 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center z-40"
      >
        <ShoppingCart className="w-6 h-6" />
        {cartItemCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
            {cartItemCount}
          </span>
        )}
      </button>

      {/* QR Code Dialog */}
      <Dialog open={showQRDialog} onOpenChange={setShowQRDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">Menu Digital QR Code</DialogTitle>
            <DialogDescription className="text-center">
              Scannez ce code pour accéder au menu
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center gap-6 py-6">
            <div className="bg-white p-6 rounded-2xl shadow-xl border-4 border-orange-100">
              <QRCodeSVG 
                value={currentUrl || 'https://espacedelice.menu'}
                size={250}
                level="H"
                includeMargin={false}
                bgColor="#ffffff"
                fgColor="#ea580c"
              />
            </div>
            <div className="text-center">
              <h3 className="font-bold text-xl text-gray-800">{restaurantInfo.name}</h3>
              <p className="text-gray-500">{restaurantInfo.tagline}</p>
            </div>
            <Button onClick={handleCopyLink} variant="outline" className="w-full">
              {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
              {copied ? 'Lien copié !' : 'Copier le lien du menu'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Booking Dialog */}
      <Dialog open={showBookingDialog} onOpenChange={setShowBookingDialog}>
        <DialogContent className="sm:max-w-md max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle className="text-center flex items-center justify-center gap-2">
              <MessageCircle className="w-6 h-6 text-green-500" />
              {cart.length > 0 ? 'Confirmer votre commande' : 'Réserver par WhatsApp'}
            </DialogTitle>
            <DialogDescription className="text-center">
              {cart.length > 0 
                ? 'Vérifiez votre commande avant d\'envoyer'
                : 'Contactez-nous directement sur WhatsApp pour votre réservation'
              }
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-6 py-4">
            {cart.length > 0 && (
              <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                <h4 className="font-semibold text-gray-700">Votre commande :</h4>
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>{item.name} x{item.quantity}</span>
                    <span className="font-medium">{item.price * item.quantity} dh</span>
                  </div>
                ))}
                <div className="border-t pt-2 flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-orange-600">{cartTotal} dh</span>
                </div>
              </div>
            )}
            <div className="flex items-center justify-center gap-3">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <Phone className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <p className="text-xl font-bold text-gray-800">{restaurantInfo.whatsappNumber}</p>
                <p className="text-gray-500">{restaurantInfo.name}</p>
              </div>
            </div>
            <div className="space-y-3">
              <Button 
                onClick={handleWhatsAppClick}
                className="w-full bg-green-500 hover:bg-green-600 text-white gap-2"
                size="lg"
              >
                <MessageCircle className="w-5 h-5" />
                {cart.length > 0 ? 'Envoyer sur WhatsApp' : 'Ouvrir WhatsApp'}
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowBookingDialog(false)}
                className="w-full"
              >
                Annuler
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer className="bg-white border-t border-orange-100 mt-12">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-rose-500 rounded-full flex items-center justify-center">
                <ChefHat className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800">{restaurantInfo.name}</h3>
                <p className="text-xs text-gray-500">{restaurantInfo.tagline}</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-orange-500" />
                <span>{restaurantInfo.whatsappNumber}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-orange-500" />
                <span>{restaurantInfo.hours}</span>
              </div>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-100 text-center text-xs text-gray-400">
            © 2024 {restaurantInfo.name} - Menu Digital
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
