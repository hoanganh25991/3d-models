/**
 * Model Registry Factory
 * Central registry for all 3D models
 */

import { robotModel } from './robot.js';
import { tankModel } from './tank.js';
import { cubeModel } from './cube.js';
import { sphereModel } from './sphere.js';
import { pyramidModel } from './pyramid.js';
import { torusModel } from './torus.js';
import { dogModel } from './dog.js';

// Register all models here
const models = [
    dogModel,
    robotModel,
    tankModel,
    cubeModel,
    sphereModel,
    pyramidModel,
    torusModel
];

// Create a map for quick lookup by id
const modelMap = new Map(models.map(model => [model.id, model]));

/**
 * Get all registered models
 * @returns {Array} Array of model definitions
 */
export function getAllModels() {
    return models;
}

/**
 * Get a model by its id
 * @param {string} id - The model id
 * @returns {Object|undefined} The model definition or undefined
 */
export function getModelById(id) {
    return modelMap.get(id);
}

/**
 * Get model metadata (without create function)
 * @returns {Array} Array of model metadata objects
 */
export function getModelList() {
    return models.map(({ id, name, icon, type, description, partCount }) => ({
        id,
        name,
        icon,
        type,
        description,
        partCount
    }));
}

/**
 * Create a model instance
 * @param {string} id - The model id
 * @param {Array} meshes - Array to collect mesh references
 * @returns {THREE.Object3D|null} The created model or null
 */
export function createModel(id, meshes) {
    const model = modelMap.get(id);
    if (model && typeof model.create === 'function') {
        return model.create(meshes);
    }
    return null;
}

// Export individual models for direct import if needed
export { robotModel, tankModel, cubeModel, sphereModel, pyramidModel, torusModel, dogModel };

