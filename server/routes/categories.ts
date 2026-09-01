import { Router, Request, Response } from 'express';
import { getDb } from '../db.js';

export const categoriesRouter = Router();

// Helper to convert sql.js result to array of objects
function resultToObjects<T = any>(result: any[]): T[] {
  if (!result || result.length === 0 || !result[0].columns) return [];
  const columns = result[0].columns;
  const values = result[0].values;
  return values.map((row: any[]) => {
    const obj: any = {};
    columns.forEach((col: string, idx: number) => {
      obj[col] = row[idx];
    });
    return obj as T;
  });
}

// GET all categories
categoriesRouter.get('/', async (req: Request, res: Response) => {
  try {
    const db = await getDb();
    const result = db.exec(`
      SELECT c.*,
        (SELECT COUNT(*) FROM exams WHERE category_id = c.id) as exam_count,
        (SELECT COUNT(*) FROM courses WHERE category_id = c.id) as course_count,
        (SELECT COUNT(*) FROM colleges WHERE category_id = c.id) as college_count
      FROM categories c
      ORDER BY c.name ASC
    `);

    const categories = resultToObjects(result);
    res.json({ success: true, data: categories });
  } catch (error: any) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET category by ID or slug
categoriesRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const db = await getDb();

    // 1. Fetch category
    const catResult = db.exec(`
      SELECT * FROM categories WHERE id = '${id}' OR slug = '${id}'
    `);
    const categories = resultToObjects(catResult);
    if (categories.length === 0) {
      return res.status(404).json({ success: false, error: 'Category not found' });
    }
    const category = categories[0];
    const categoryId = category.id;

    // 2. Fetch exams with structures
    const examsResult = db.exec(`
      SELECT * FROM exams WHERE category_id = '${categoryId}' ORDER BY code ASC
    `);
    const rawExams = resultToObjects(examsResult);

    const structuresResult = db.exec(`
      SELECT * FROM exam_structures WHERE exam_id IN (SELECT id FROM exams WHERE category_id = '${categoryId}')
    `);
    const structures = resultToObjects(structuresResult);

    const exams = rawExams.map(ex => ({
      ...ex,
      structures: structures.filter(s => s.exam_id === ex.id)
    }));

    // 3. Fetch eligibility rules
    const eligResult = db.exec(`
      SELECT * FROM eligibility_rules WHERE category_id = '${categoryId}'
    `);
    const eligibilityRules = resultToObjects(eligResult);

    // 4. Fetch preparation strategy
    const prepResult = db.exec(`
      SELECT * FROM preparation_strategies WHERE category_id = '${categoryId}'
    `);
    const prepList = resultToObjects(prepResult);
    let preparation = null;
    if (prepList.length > 0) {
      const rawPrep = prepList[0];
      preparation = {
        ...rawPrep,
        key_phases: JSON.parse(rawPrep.key_phases_json || '[]'),
        recommended_resources: JSON.parse(rawPrep.recommended_resources_json || '[]')
      };
    }

    // 5. Fetch subjects & topics
    const subResult = db.exec(`
      SELECT * FROM subjects WHERE category_id = '${categoryId}'
    `);
    const rawSubjects = resultToObjects(subResult);

    const topResult = db.exec(`
      SELECT st.*, s.name as subject_name
      FROM syllabus_topics st
      JOIN subjects s ON st.subject_id = s.id
      WHERE s.category_id = '${categoryId}'
    `);
    const rawTopics = resultToObjects(topResult);

    const subjects = rawSubjects.map(sub => ({
      ...sub,
      topics: rawTopics
        .filter(t => t.subject_id === sub.id)
        .map(t => ({
          ...t,
          overlap_exams: JSON.parse(t.overlap_exams_json || '[]')
        }))
    }));

    // 6. Fetch courses and batches
    const crsResult = db.exec(`
      SELECT * FROM courses WHERE category_id = '${categoryId}'
    `);
    const rawCourses = resultToObjects(crsResult);

    const batchResult = db.exec(`
      SELECT * FROM course_batches WHERE course_id IN (SELECT id FROM courses WHERE category_id = '${categoryId}')
    `);
    const rawBatches = resultToObjects(batchResult);

    const courses = rawCourses.map(crs => ({
      ...crs,
      features: JSON.parse(crs.features_json || '[]'),
      batches: rawBatches.filter(b => b.course_id === crs.id)
    }));

    // 7. Fetch exam mappings
    const mapResult = db.exec(`
      SELECT * FROM exam_mappings WHERE category_id = '${categoryId}'
    `);
    const examMappings = resultToObjects(mapResult);

    // 8. Fetch colleges and programs
    const colResult = db.exec(`
      SELECT * FROM colleges WHERE category_id = '${categoryId}'
    `);
    const rawColleges = resultToObjects(colResult);

    const prgResult = db.exec(`
      SELECT * FROM college_programs WHERE college_id IN (SELECT id FROM colleges WHERE category_id = '${categoryId}')
    `);
    const rawPrograms = resultToObjects(prgResult);

    const colleges = rawColleges.map(col => ({
      ...col,
      programs: rawPrograms.filter(p => p.college_id === col.id)
    }));

    // 9. Fetch 3-year results
    const resResult = db.exec(`
      SELECT * FROM exam_results WHERE category_id = '${categoryId}' ORDER BY academic_year DESC
    `);
    const results = resultToObjects(resResult);

    // 10. Fetch success stories
    const sucResult = db.exec(`
      SELECT * FROM success_stories WHERE category_id = '${categoryId}'
    `);
    const successStories = resultToObjects(sucResult);

    res.json({
      success: true,
      data: {
        category,
        exams,
        eligibilityRules,
        preparation,
        subjects,
        courses,
        examMappings,
        colleges,
        results,
        successStories
      }
    });
  } catch (error: any) {
    console.error('Error fetching category details:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});
