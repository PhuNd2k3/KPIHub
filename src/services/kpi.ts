import { Criteria } from "./../components/Target/Criteria";
import { v4 as uuidv4 } from "uuid";

import { getDataFromDb, storeDataInDb } from "./localStorage";

interface ITarget {
    tagetId: string;
    targetName: string;
    targetDes: string;
    weight: string;
}

// tieu chi
interface ICriteria {
    criteriaId: string;
    criteriaName: string;
    criteiaDesc: string;
    objective: number;
    unit: string;
    weight: string;
}

interface Task {
    taskId: string;
    taskName: string;
    taskDes: string;
    objective: number;
    unit: string;
}

const listKPI = [
    {
        targetId: "T001",
        targetName: "Giang day",
        targetDes: "Deo biet",
        targetStatus: "On going",
        weight: 40,
        criterias: [
            {
                criteriaId: "C001",
                criteriaName: "Tieu chi C001",
                criteriaDesc: "Day la tieu chi",
                criteriaStatus: "On Going",
                criteriaProgress: 80,
                objective: 10,
                unit: "gio",
                weight: 10,
                tasks: [
                    {
                        taskId: "TA001",
                        taskName: "string",
                        taskDes: "Deo biet luon",
                        taskStatus: "Done",
                        taskProgress: 40,
                        objective: 10,
                        unit: "gio",
                    },
                ],
            },
        ],
    },
];

export const getListKpi = () => {
    const listKpi = getDataFromDb("listKpi") ? getDataFromDb("listKpi") : [];

    return listKpi;
};

export const getTargetById = (targetId: string) => {
    const listKpi = getDataFromDb("listKpi") ? getDataFromDb("listKpi") : [];

    return listKpi.filter((kpi) => kpi.targetId === targetId)[0];
};

export const addTarget = (target) => {
    const listKpi = getDataFromDb("listKpi") ? getDataFromDb("listKpi") : [];

    target.targetId = uuidv4();

    storeDataInDb("listKpi", [...listKpi, target]);

    return target;
};

export const createTarget = (target) => {
    target.targetId = uuidv4();

    return target;
};

export const editTarget = (target) => {
    const listKpi = getDataFromDb("listKpi") ? getDataFromDb("listKpi") : [];

    const updatedListKpi = listKpi.map((kpi) => {
        if (kpi.targetId == target.targetId) {
            kpi.targetName = target.targetName;
            kpi.targetDes = target.targetDes;
            kpi.weight = target.weight;
        }

        return kpi;
    });

    storeDataInDb("listKpi", updatedListKpi);

    return target;
};

export const deleteTargetById = (targetId: string) => {
    const listKpi = getDataFromDb("listKpi") ? getDataFromDb("listKpi") : [];

    const newListKpi = listKpi.filter((target) => target.targetId !== targetId);

    storeDataInDb("listKpi", newListKpi);

    return newListKpi;
};

export const addCriteria = (targetId, criteria) => {
    const listKpi = getDataFromDb("listKpi") ? getDataFromDb("listKpi") : [];

    criteria.criteriaId = uuidv4();

    const newListKpi = listKpi.map((kpi) => {
        if (kpi?.targetId == targetId) {
            if (kpi.criterias) {
                return {
                    ...kpi,
                    criterias: [...kpi.criterias, criteria],
                };
            }

            return {
                ...kpi,
                criterias: [criteria],
            };
        }

        return kpi;
    });

    storeDataInDb("listKpi", newListKpi);

    return criteria;
};

export const updateProgressTask = (
    targetId,
    criteriaId,
    taskId,
    newTaskProgress
) => {
    const listKpi = getDataFromDb("listKpi") ? getDataFromDb("listKpi") : [];

    const newListKpi = listKpi.map((kpi) => {
        if (kpi?.targetId == targetId) {
            const newListCriteria = kpi?.criterias.map((criteria) => {
                // update criteria
                if (criteria.criteriaId == criteriaId) {
                    let newCriteriaProgress = 0;

                    // update task
                    const newListTask = criteria.tasks.map((task) => {
                        if (task.taskId == taskId) {
                            newCriteriaProgress += Number(newTaskProgress);

                            return { ...task, taskProgress: newTaskProgress };
                        }

                        newCriteriaProgress += Number(task.taskProgress);

                        return task;
                    });

                    // criteria sau khi update tien do cua 1 task
                    return {
                        ...criteria,
                        criteriaProgress: newCriteriaProgress,
                        tasks: newListTask,
                    };
                }

                return criteria;
            });

            return { ...kpi, criterias: newListCriteria };
        }

        return kpi;
    });

    storeDataInDb("listKpi", newListKpi);

    return newListKpi;
};

export const addTask = (targetId, criteriaId, task) => {
    const listKpi = getDataFromDb("listKpi") ? getDataFromDb("listKpi") : [];

    task.taskId = uuidv4();

    const newListKpi = listKpi.map((kpi) => {
        if (kpi?.targetId == targetId) {
            const newListCriteria = kpi?.criterias.map((criteria) => {
                if (criteria?.criteriaId == criteriaId) {
                    task.unit = criteria.unit;
                    if (criteria?.tasks) {
                        return {
                            ...criteria,
                            tasks: [...criteria.tasks, task],
                        };
                    } else {
                        return {
                            ...criteria,
                            tasks: [task],
                        };
                    }
                }

                return criteria;
            });

            return { ...kpi, criterias: newListCriteria };
        }

        return kpi;
    });

    console.log(newListKpi);

    storeDataInDb("listKpi", newListKpi);

    return task;
};
