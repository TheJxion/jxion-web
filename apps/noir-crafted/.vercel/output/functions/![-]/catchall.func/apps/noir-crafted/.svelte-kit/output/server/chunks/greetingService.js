import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
function getNodeEnv() {
  try {
    if (typeof process !== "undefined" && process.env) {
      return "production";
    }
  } catch {
  }
  try {
    const hasImportMeta = typeof Function !== "undefined" && new Function(
      'try { return typeof import.meta !== "undefined"; } catch { return false; }'
    )();
    if (hasImportMeta) {
      const getViteMode = new Function(
        'try { return import.meta.env?.MODE || "development"; } catch { return "development"; }'
      );
      const viteMode = getViteMode();
      if (viteMode && viteMode !== "development") {
        return viteMode;
      }
    }
  } catch {
  }
  return "development";
}
class JxionDebugger {
  constructor() {
    this.config = {
      enabled: getNodeEnv() === "development",
      logLevel: "info",
      components: true,
      templates: true,
      frameworkConversion: true,
      configuration: true,
      trpc: true,
      performance: true
    };
    this.performanceTimers = /* @__PURE__ */ new Map();
  }
  /**
   * Configure debug settings
   */
  configure(config) {
    this.config = { ...this.config, ...config };
    this.log("info", "Debug configuration updated", { config: this.config });
  }
  /**
   * Check if debugging is enabled for a specific category
   */
  isEnabled(category) {
    return this.config.enabled && this.config[category];
  }
  /**
   * Start performance timing
   */
  startTimer(label) {
    if (!this.isEnabled("performance")) return;
    this.performanceTimers.set(label, performance.now());
  }
  /**
   * End performance timing and log result
   */
  endTimer(label, context) {
    if (!this.isEnabled("performance")) return;
    const startTime = this.performanceTimers.get(label);
    if (startTime) {
      const duration = performance.now() - startTime;
      this.log("debug", `Performance: ${label}`, {
        ...context,
        duration: `${duration.toFixed(2)}ms`
      });
      this.performanceTimers.delete(label);
    }
  }
  /**
   * Log component-related debug information
   */
  component(level, message, context) {
    if (!this.isEnabled("components")) return;
    this.log(level, `[COMPONENT] ${message}`, context);
  }
  /**
   * Log template-related debug information
   */
  template(level, message, context) {
    if (!this.isEnabled("templates")) return;
    this.log(level, `[TEMPLATE] ${message}`, context);
  }
  /**
   * Log framework conversion debug information
   */
  frameworkConversion(level, message, context) {
    if (!this.isEnabled("frameworkConversion")) return;
    this.log(level, `[FRAMEWORK] ${message}`, context);
  }
  /**
   * Log configuration debug information
   */
  configuration(level, message, context) {
    if (!this.isEnabled("configuration")) return;
    this.log(level, `[CONFIG] ${message}`, context);
  }
  /**
   * Log tRPC-related debug information
   */
  trpc(level, message, context) {
    if (!this.isEnabled("trpc")) return;
    this.log(level, `[TRPC] ${message}`, context);
  }
  /**
   * Core logging method
   */
  log(level, message, context) {
    if (!this.config.enabled) return;
    const levels = { error: 0, warn: 1, info: 2, debug: 3 };
    if (levels[level] > levels[this.config.logLevel]) return;
    const timestamp = (/* @__PURE__ */ new Date()).toISOString();
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
  logComponentRegistry(operation, componentName, metadata) {
    this.component("info", `Component Registry: ${operation}`, {
      component: componentName,
      operation,
      metadata
    });
  }
  /**
   * Log template rendering operations
   */
  logTemplateRendering(templateName, framework, variables) {
    this.template("info", `Rendering template: ${templateName}`, {
      component: templateName,
      framework,
      operation: "render",
      metadata: { variableCount: Object.keys(variables).length }
    });
  }
  /**
   * Log framework conversion operations
   */
  logFrameworkConversion(fromFramework, toFramework, templateName) {
    this.frameworkConversion(
      "info",
      `Converting ${fromFramework} to ${toFramework}`,
      {
        component: templateName,
        framework: toFramework,
        operation: "convert",
        metadata: { fromFramework, toFramework }
      }
    );
  }
  /**
   * Log configuration loading
   */
  logConfigLoad(configType, configName, configData) {
    this.configuration("info", `Loading ${configType}: ${configName}`, {
      operation: "load",
      metadata: { configType, configName, hasData: !!configData }
    });
  }
  /**
   * Log tRPC operations
   */
  logTrpcOperation(operation, endpoint, data) {
    this.trpc("info", `tRPC ${operation}: ${endpoint}`, {
      operation,
      metadata: { endpoint, hasData: !!data }
    });
  }
}
const jxionDebugger = new JxionDebugger();
const debug = {
  configure: (config) => jxionDebugger.configure(config),
  component: (level, message, context) => jxionDebugger.component(level, message, context),
  template: (level, message, context) => jxionDebugger.template(level, message, context),
  frameworkConversion: (level, message, context) => jxionDebugger.frameworkConversion(level, message, context),
  configuration: (level, message, context) => jxionDebugger.configuration(level, message, context),
  trpc: (level, message, context) => jxionDebugger.trpc(level, message, context),
  startTimer: (label) => jxionDebugger.startTimer(label),
  endTimer: (label, context) => jxionDebugger.endTimer(label, context),
  logComponentRegistry: (operation, componentName, metadata) => jxionDebugger.logComponentRegistry(operation, componentName, metadata),
  logTemplateRendering: (templateName, framework, variables) => jxionDebugger.logTemplateRendering(templateName, framework, variables),
  logFrameworkConversion: (fromFramework, toFramework, templateName) => jxionDebugger.logFrameworkConversion(
    fromFramework,
    toFramework,
    templateName
  ),
  logConfigLoad: (configType, configName, configData) => jxionDebugger.logConfigLoad(configType, configName, configData),
  logTrpcOperation: (operation, endpoint, data) => jxionDebugger.logTrpcOperation(operation, endpoint, data)
};
let clientInstance = null;
const createJxionClient = (url = "http://localhost:3005/trpc") => {
  if (clientInstance) {
    debug.trpc("info", "tRPC client reused (singleton)", {
      operation: "reuse",
      metadata: {
        url,
        clientType: "TRPCProxyClient",
        singleton: true
      }
    });
    return clientInstance;
  }
  debug.startTimer("trpc-client-creation");
  debug.logTrpcOperation("create", "client", { url });
  clientInstance = createTRPCProxyClient({
    links: [
      httpBatchLink({
        url
      })
    ]
  });
  debug.trpc("info", "tRPC client created successfully", {
    operation: "create",
    metadata: {
      url,
      clientType: "TRPCProxyClient",
      linksCount: 1,
      singleton: true
    }
  });
  debug.endTimer("trpc-client-creation", { url });
  return clientInstance;
};
class MessageService {
  constructor() {
    this.client = createJxionClient();
  }
  async getMessages(limit = 10) {
    debug.startTimer(`messageService-getMessages-${limit}`);
    debug.logTrpcOperation("query", "getMessages", { limit });
    try {
      const result = await this.client.getMessages.query(limit);
      debug.trpc("info", "Successfully fetched messages", {
        operation: "query",
        metadata: {
          endpoint: "getMessages",
          limit,
          resultCount: result.length,
          success: true
        }
      });
      debug.endTimer(`messageService-getMessages-${limit}`, {
        operation: "getMessages",
        limit,
        resultCount: result.length
      });
      return result;
    } catch (error) {
      debug.trpc("error", "Failed to fetch messages", {
        operation: "query",
        metadata: {
          endpoint: "getMessages",
          limit,
          error: error instanceof Error ? error.message : "Unknown error",
          success: false
        }
      });
      debug.endTimer(`messageService-getMessages-${limit}`, {
        operation: "getMessages",
        limit,
        error: true
      });
      console.error("Failed to fetch messages:", error);
      throw error;
    }
  }
  async addMessage(user, message) {
    try {
      return await this.client.addMessage.mutate({ user, message });
    } catch (error) {
      console.error("Failed to add message:", error);
      throw error;
    }
  }
  async getMessage(id) {
    try {
      return await this.client.getMessage.query(id);
    } catch (error) {
      console.error("Failed to fetch message:", error);
      throw error;
    }
  }
  async deleteMessage(id) {
    try {
      return await this.client.deleteMessage.mutate(id);
    } catch (error) {
      console.error("Failed to delete message:", error);
      throw error;
    }
  }
  async getMessageCount() {
    try {
      return await this.client.getMessageCount.query();
    } catch (error) {
      console.error("Failed to fetch message count:", error);
      throw error;
    }
  }
}
new MessageService();
class GreetingService {
  constructor() {
    this.client = createJxionClient();
  }
  async getGreeting() {
    try {
      return await this.client.greetings.query();
    } catch (error) {
      console.error("Failed to fetch greeting:", error);
      throw error;
    }
  }
}
new GreetingService();
