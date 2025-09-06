// Advanced Scroll Performance Monitoring and Optimization Utilities

class ScrollPerformanceMonitor {
  constructor() {
    this.metrics = {
      frameDrops: 0,
      averageFPS: 60,
      scrollEvents: 0,
      lastFrameTime: performance.now(),
      fpsHistory: [],
      isThrottling: false
    };
    
    this.thresholds = {
      minFPS: 45, // Below this, start throttling
      maxScrollEvents: 100, // Per second
      frameDropThreshold: 5 // Consecutive dropped frames
    };
    
    this.isMonitoring = false;
    this.rafId = null;
  }

  // Start performance monitoring
  startMonitoring() {
    if (this.isMonitoring) return;
    this.isMonitoring = true;
    this.monitorPerformance();
    console.log('🔍 Scroll performance monitoring started');
  }

  // Stop performance monitoring
  stopMonitoring() {
    this.isMonitoring = false;
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    console.log('🔍 Scroll performance monitoring stopped');
  }

  // Monitor frame rate and scroll performance
  monitorPerformance() {
    const now = performance.now();
    const deltaTime = now - this.metrics.lastFrameTime;
    const currentFPS = 1000 / deltaTime;
    
    // Track FPS history
    this.metrics.fpsHistory.push(currentFPS);
    if (this.metrics.fpsHistory.length > 30) {
      this.metrics.fpsHistory.shift();
    }
    
    // Calculate average FPS
    this.metrics.averageFPS = this.metrics.fpsHistory.reduce((a, b) => a + b, 0) / this.metrics.fpsHistory.length;
    
    // Detect frame drops
    if (currentFPS < this.thresholds.minFPS) {
      this.metrics.frameDrops++;
      if (this.metrics.frameDrops > this.thresholds.frameDropThreshold) {
        this.enableThrottling();
      }
    } else {
      this.metrics.frameDrops = Math.max(0, this.metrics.frameDrops - 1);
    }
    
    // Auto-disable throttling when performance improves
    if (this.metrics.isThrottling && this.metrics.averageFPS > this.thresholds.minFPS + 10) {
      this.disableThrottling();
    }
    
    this.metrics.lastFrameTime = now;
    
    if (this.isMonitoring) {
      this.rafId = requestAnimationFrame(() => this.monitorPerformance());
    }
  }

  // Enable performance throttling
  enableThrottling() {
    if (this.metrics.isThrottling) return;
    this.metrics.isThrottling = true;
    
    // Dispatch throttling event
    window.dispatchEvent(new CustomEvent('scrollThrottleEnable', {
      detail: {
        reason: 'low_fps',
        currentFPS: this.metrics.averageFPS,
        recommendation: 'reduce_scroll_frequency'
      }
    }));
    
    console.log('⚠️ Scroll throttling enabled - FPS:', Math.round(this.metrics.averageFPS));
  }

  // Disable performance throttling
  disableThrottling() {
    if (!this.metrics.isThrottling) return;
    this.metrics.isThrottling = false;
    
    // Dispatch throttling disable event
    window.dispatchEvent(new CustomEvent('scrollThrottleDisable', {
      detail: {
        currentFPS: this.metrics.averageFPS,
        status: 'performance_restored'
      }
    }));
    
    console.log('✅ Scroll throttling disabled - FPS restored:', Math.round(this.metrics.averageFPS));
  }

  // Get current performance metrics
  getMetrics() {
    return {
      ...this.metrics,
      isHealthy: this.metrics.averageFPS > this.thresholds.minFPS && !this.metrics.isThrottling
    };
  }

  // Optimize scroll event frequency based on performance
  getOptimalScrollThrottle() {
    if (this.metrics.isThrottling) {
      return 33; // ~30fps when throttling
    } else if (this.metrics.averageFPS < 50) {
      return 25; // ~40fps for mid-range performance
    } else {
      return 16; // ~60fps for good performance
    }
  }
}

// Throttle utility for scroll events
export const createScrollThrottle = (callback, delay = 16) => {
  let lastCall = 0;
  return (...args) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      callback.apply(this, args);
    }
  };
};

// Debounce utility for scroll end detection
export const createScrollDebounce = (callback, delay = 150) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, args), delay);
  };
};

// Intersection Observer with performance optimization
export const createOptimizedIntersectionObserver = (callback, options = {}) => {
  const defaultOptions = {
    threshold: 0.1,
    rootMargin: '50px',
    // Optimize for performance
    trackVisibility: true,
    delay: 100
  };

  return new IntersectionObserver(callback, { ...defaultOptions, ...options });
};

// Global scroll performance monitor instance
export const scrollPerformanceMonitor = new ScrollPerformanceMonitor();

// Auto-start monitoring in development
if (import.meta.env.DEV) {
  scrollPerformanceMonitor.startMonitoring();
}

export default ScrollPerformanceMonitor;
