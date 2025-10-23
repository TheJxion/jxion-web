/**
 * @fileoverview Debug Utilities
 *
 * Comprehensive debugging system for the Jxion framework core.
 * Provides detailed logging for component rendering, framework conversion,
 * template processing, and configuration management.
 *
 * @author Jxion Framework Team
 * @version 1.0.0
 */

export interface DebugConfig {
  enabled: boolean;
  logLevel: "error" | "warn" | "info" | "debug";
  components: boolean;
  templates: boolean;
  frameworkConversion: boolean;
  configuration: boolean;
  trpc: boolean;
  performance: boolean;
}

export interface DebugContext {
  component?: string;
  framework?: string;
  operation?: string;
  timestamp?: number;
  metadata?: Record<string, any>;
  [key: string]: any; // Allow additional properties
}

class JxionDebugger {
  private config: DebugConfig = {
    enabled: process.env.NODE_ENV === "development",
    logLevel: "info",
    components: true,
    templates: true,
    frameworkConversion: true,
    configuration: true,
    trpc: true,
    performance: true,
  };

  private performanceTimers: Map<string, number> = new Map();

  /**
   * Configure debug settings
   */
  configure(config: Partial<DebugConfig>): void {
    this.config = { ...this.config, ...config };
    this.log("info", "Debug configuration updated", { config: this.config });
  }

  /**
   * Check if debugging is enabled for a specific category
   */
  isEnabled(
    category: keyof Omit<DebugConfig, "enabled" | "logLevel">
  ): boolean {
    return this.config.enabled && this.config[category];
  }

  /**
   * Start performance timing
   */
  startTimer(label: string): void {
    if (!this.isEnabled("performance")) return;
    this.performanceTimers.set(label, performance.now());
  }

  /**
   * End performance timing and log result
   */
  endTimer(label: string, context?: DebugContext): void {
    if (!this.isEnabled("performance")) return;

    const startTime = this.performanceTimers.get(label);
    if (startTime) {
      const duration = performance.now() - startTime;
      this.log("debug", `Performance: ${label}`, {
        ...context,
        duration: `${duration.toFixed(2)}ms`,
      });
      this.performanceTimers.delete(label);
    }
  }

  /**
   * Log component-related debug information
   */
  component(
    level: "error" | "warn" | "info" | "debug",
    message: string,
    context?: DebugContext
  ): void {
    if (!this.isEnabled("components")) return;
    this.log(level, `[COMPONENT] ${message}`, context);
  }

  /**
   * Log template-related debug information
   */
  template(
    level: "error" | "warn" | "info" | "debug",
    message: string,
    context?: DebugContext
  ): void {
    if (!this.isEnabled("templates")) return;
    this.log(level, `[TEMPLATE] ${message}`, context);
  }

  /**
   * Log framework conversion debug information
   */
  frameworkConversion(
    level: "error" | "warn" | "info" | "debug",
    message: string,
    context?: DebugContext
  ): void {
    if (!this.isEnabled("frameworkConversion")) return;
    this.log(level, `[FRAMEWORK] ${message}`, context);
  }

  /**
   * Log configuration debug information
   */
  configuration(
    level: "error" | "warn" | "info" | "debug",
    message: string,
    context?: DebugContext
  ): void {
    if (!this.isEnabled("configuration")) return;
    this.log(level, `[CONFIG] ${message}`, context);
  }

  /**
   * Log tRPC-related debug information
   */
  trpc(
    level: "error" | "warn" | "info" | "debug",
    message: string,
    context?: DebugContext
  ): void {
    if (!this.isEnabled("trpc")) return;
    this.log(level, `[TRPC] ${message}`, context);
  }

  /**
   * Core logging method
   */
  private log(
    level: "error" | "warn" | "info" | "debug",
    message: string,
    context?: DebugContext
  ): void {
    if (!this.config.enabled) return;

    const levels = { error: 0, warn: 1, info: 2, debug: 3 };
    if (levels[level] > levels[this.config.logLevel]) return;

    const timestamp = new Date().toISOString();
    const contextStr = context ? ` | ${JSON.stringify(context, null, 2)}` : "";

    const logMessage = `[JXION-CORE] ${timestamp} | ${message}${contextStr}`;

    switch (level) {
      case "error":
        console.error(logMessage);
        break;
      case "warn":
        console.warn(logMessage);
        break;
      case "info":
        console.info(logMessage);
        break;
      case "debug":
        console.debug(logMessage);
        break;
    }
  }

  /**
   * Log component registry operations
   */
  logComponentRegistry(
    operation: string,
    componentName: string,
    metadata?: any
  ): void {
    this.component("info", `Component Registry: ${operation}`, {
      component: componentName,
      operation,
      metadata,
    });
  }

  /**
   * Log template rendering operations
   */
  logTemplateRendering(
    templateName: string,
    framework: string,
    variables: Record<string, any>
  ): void {
    this.template("info", `Rendering template: ${templateName}`, {
      component: templateName,
      framework,
      operation: "render",
      metadata: { variableCount: Object.keys(variables).length },
    });
  }

  /**
   * Log framework conversion operations
   */
  logFrameworkConversion(
    fromFramework: string,
    toFramework: string,
    templateName: string
  ): void {
    this.frameworkConversion(
      "info",
      `Converting ${fromFramework} to ${toFramework}`,
      {
        component: templateName,
        framework: toFramework,
        operation: "convert",
        metadata: { fromFramework, toFramework },
      }
    );
  }

  /**
   * Log configuration loading
   */
  logConfigLoad(
    configType: string,
    configName: string,
    configData?: any
  ): void {
    this.configuration("info", `Loading ${configType}: ${configName}`, {
      operation: "load",
      metadata: { configType, configName, hasData: !!configData },
    });
  }

  /**
   * Log tRPC operations
   */
  logTrpcOperation(operation: string, endpoint: string, data?: any): void {
    this.trpc("info", `tRPC ${operation}: ${endpoint}`, {
      operation,
      metadata: { endpoint, hasData: !!data },
    });
  }
}

// Export singleton instance
const jxionDebugger = new JxionDebugger();

// Export convenience methods
export const debug = {
  configure: (config: Partial<DebugConfig>) => jxionDebugger.configure(config),
  component: (
    level: "error" | "warn" | "info" | "debug",
    message: string,
    context?: DebugContext
  ) => jxionDebugger.component(level, message, context),
  template: (
    level: "error" | "warn" | "info" | "debug",
    message: string,
    context?: DebugContext
  ) => jxionDebugger.template(level, message, context),
  frameworkConversion: (
    level: "error" | "warn" | "info" | "debug",
    message: string,
    context?: DebugContext
  ) => jxionDebugger.frameworkConversion(level, message, context),
  configuration: (
    level: "error" | "warn" | "info" | "debug",
    message: string,
    context?: DebugContext
  ) => jxionDebugger.configuration(level, message, context),
  trpc: (
    level: "error" | "warn" | "info" | "debug",
    message: string,
    context?: DebugContext
  ) => jxionDebugger.trpc(level, message, context),
  startTimer: (label: string) => jxionDebugger.startTimer(label),
  endTimer: (label: string, context?: DebugContext) =>
    jxionDebugger.endTimer(label, context),
  logComponentRegistry: (
    operation: string,
    componentName: string,
    metadata?: any
  ) => jxionDebugger.logComponentRegistry(operation, componentName, metadata),
  logTemplateRendering: (
    templateName: string,
    framework: string,
    variables: Record<string, any>
  ) => jxionDebugger.logTemplateRendering(templateName, framework, variables),
  logFrameworkConversion: (
    fromFramework: string,
    toFramework: string,
    templateName: string
  ) =>
    jxionDebugger.logFrameworkConversion(
      fromFramework,
      toFramework,
      templateName
    ),
  logConfigLoad: (configType: string, configName: string, configData?: any) =>
    jxionDebugger.logConfigLoad(configType, configName, configData),
  logTrpcOperation: (operation: string, endpoint: string, data?: any) =>
    jxionDebugger.logTrpcOperation(operation, endpoint, data),
};
