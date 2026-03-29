-- Actualizar máquinas con fotos placeholder
-- Este script añade URLs de imágenes a las máquinas existentes

-- Opción 1: Si quieres usar URLs de imágenes externas (más simple)
UPDATE machines 
SET photo = 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500&h=500&fit=crop' 
WHERE item LIKE '%excavadora%' OR item LIKE '%Excavador%' 
LIMIT 1;

UPDATE machines 
SET photo = 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500&h=500&fit=crop' 
WHERE item NOT LIKE '%excavadora%' AND item NOT LIKE '%Excavador%' 
LIMIT 1;

-- Verificar que las fotos se actualizaron
SELECT id, item, photo FROM machines;
