import { ref } from "vue";
import { makeHttpReq } from "../../../../helper/makeHttpReq";
import { ShowErrorResponse } from "../../../../helper/util";
import { successMsg } from "../../../../helper/toast-notification";

export function useDeleteProject() {
    const loading = ref(false);

    async function deleteProject(projectId: number) {
        try {
            loading.value = true;
            // Sending projectId in the body
            const data = await makeHttpReq<{ projectId: number }, { message: string }>(
                `projects`,  // No need for projectId in the URL
                'DELETE',
                { projectId } // Send the ID in the body
            );
            loading.value = false;
            successMsg(data.message);
        } catch (error) {
            loading.value = false;
            ShowErrorResponse(error);
        }
    }

    return { deleteProject };
}





